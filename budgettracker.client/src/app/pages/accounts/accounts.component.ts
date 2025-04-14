import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from "../../shared/models";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public accounts$ = new BehaviorSubject<Account[] | null>(null);

  constructor(
    private data: DataService,
  ) {}

  ngOnInit(): void {
    this.data.getAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(accounts => this.accounts$.next(accounts))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createAccount(): void {
    console.log('Creating account...');
  }

  editAccount(id: number): void {
    console.log('Edit account...', id);
  }

  deleteAccount(id: number): void {
    console.log('Delete account...', id);
  }
}
