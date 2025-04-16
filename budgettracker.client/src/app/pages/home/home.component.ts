import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {provideNativeDateAdapter} from "@angular/material/core";
import {FormControl} from "@angular/forms";
import {addDays, format, subDays} from "date-fns";
import {DataService} from "../../services/data.service";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {Transaction} from "../../shared/models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public activeDate: FormControl = new FormControl({
    value: format(new Date(), 'yyyy-MM-dd'),
    disabled: true
  });
  public transactions$ = new BehaviorSubject<Transaction[] | null>(null);

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.getTransactions();

    this.activeDate.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.getTransactions())
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTransactions(): void {
    const date = format(new Date(this.activeDate.value), 'yyyy-MM-dd');

    this.dataService.getTransactions({ startDate: date })
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(data => this.transactions$.next(data))
      )
      .subscribe();
  }

  changeDate(direction: boolean): void {
    const date = new Date(this.activeDate.value);

    if (direction) {
      this.activeDate.setValue(addDays(date, 1))
    } else {
      this.activeDate.setValue(subDays(date, 1))
    }
  }

  createTransaction(): void {
    console.log('Creating new transaction');
  }
}
