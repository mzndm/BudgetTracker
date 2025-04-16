import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {provideNativeDateAdapter} from "@angular/material/core";
import {FormControl} from "@angular/forms";
import {addDays, format, subDays} from "date-fns";
import {DataService} from "../../services/data.service";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {Account, Category, Transaction} from "../../shared/models";
import {MatDialog} from "@angular/material/dialog";
import {EditTransactionComponent} from "./components/edit-transaction/edit-transaction.component";

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

  transactions$ = new BehaviorSubject<Transaction[] | null>(null);
  categories$ = new BehaviorSubject<Category[]>([]);
  accounts$ = new BehaviorSubject<Account[]>([]);

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getTransactions();
    this.getAccounts();
    this.getCategories();

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

  getAccounts(): void {
    this.dataService.getAccounts()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(data => this.accounts$.next(data))
      )
      .subscribe();
  }

  getCategories(): void {
    this.dataService.getCategories()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(data => this.categories$.next(data))
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
    const dialogRef = this.dialog.open(EditTransactionComponent, {
      width: '400px',
      data: {
        accounts: this.accounts$.value,
        categories: this.categories$.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.createTransaction({
          date: this.activeDate.value,
          ...result
        })
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.getTransactions());
      } else {
        console.log('Dialog was closed without saving');
      }
    });
  }

  editTransaction(transaction: Transaction): void {
    console.log('edit transaction');
  }

  deleteTransaction(id: number): void {
    console.log('delete transaction');
  }
}
