import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MonobankAccount, MonobankTransaction } from '../../../../shared/models';
import { DataService } from '../../../../services/data.service';
import { addMonths, endOfMonth, startOfMonth, subMonths} from "date-fns";
import { ActivatedRoute } from "@angular/router";
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy {
  private readonly dataService = inject(DataService)
  private readonly route = inject(ActivatedRoute)

  public activeDate = signal<Date>(new Date());
  public account = signal<MonobankAccount | null>(null);
  
  private unsubscribe$: Subject<void> = new Subject();

  transactions = signal<MonobankTransaction[]>([]);

  ngOnInit() {
    const accountId = this.route.snapshot.paramMap.get('id');

    if (accountId) {
      this.getAccount(accountId);
      this.getTransactions(accountId);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  
  getAccount(accountId: string): void {    
    this.dataService.getMonobankAccount(accountId)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(data => this.account.set(data))
      )
      .subscribe();
  }

  getTransactions(accountId: string): void {    
    const date = new Date(this.activeDate());
    
    const fromUnixTime = Math.floor(startOfMonth(date).getTime() / 1000);
    const toUnixTime = Math.floor(endOfMonth(date).getTime() / 1000);

    this.dataService.getMonobankTransactions({accountId, from: fromUnixTime, to: toUnixTime })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.transactions.set(data));
  }

  editAccount(account: MonobankAccount): void {
    console.log('editAccount', account);
  }

  syncTransactions(): void {    
    const date = new Date(this.activeDate());
    const currentUnixTime = Math.floor(new Date().getTime() / 1000);
    const fromUnixTime = Math.floor(startOfMonth(date).getTime() / 1000);
    const toUnixTime = Math.floor(endOfMonth(date).getTime() / 1000);

    const toTime = toUnixTime < currentUnixTime ? toUnixTime : currentUnixTime;

    this.dataService.syncMonobankTransactions({ 
      accountId: this.account()?.id, 
      from: fromUnixTime, 
      to: toTime
    })
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(() => this.dataService.getMonobankTransactions({
           accountId: this.account()?.id, 
           from: fromUnixTime, 
           to: toTime 
          })
        ),
        tap(data => this.transactions.set(data))
      )
      .subscribe();
  }

  changeDate(direction: boolean): void {
    const date = new Date(this.activeDate());

    if (direction) {
      this.activeDate.set(addMonths(date, 1));
    } else {
      this.activeDate.set(subMonths(date, 1));
    }

    const accountId = this.account()?.id;
    if (accountId) {
      this.getTransactions(accountId);
    }
  }
}
