import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from "../../shared/models";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {DataService} from "../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {EditAccountComponent} from "./components/edit-account/edit-account.component";

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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAccounts(): void {
    this.data.getAccounts()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(accounts => this.accounts$.next(accounts))
      )
      .subscribe();
  }

  createAccount(): void {
    const dialogRef = this.dialog.open(EditAccountComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.createAccount(result)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.getAccounts());
      } else {
        console.log('Dialog was closed without saving');
      }
    });
  }

  editAccount(account: Account): void {
    const dialogRef = this.dialog.open(EditAccountComponent, {
      width: '400px',
      data: {
        type: account.type,
        name: account.name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.updateAccount({...account, ...result})
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.getAccounts());
      } else {
        console.log('Dialog was closed without saving');
      }
    });
  }

  deleteAccount(id: number): void {
    console.log('Delete account...', id);
  }
}
