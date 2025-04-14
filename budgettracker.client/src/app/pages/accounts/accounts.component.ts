import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from "../../shared/models";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {DataService} from "../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {EditAccountComponent} from "./components/edit-account/edit-account.component";
import {DeleteDialogComponent} from "../../shared/components/delete-dialog/delete-dialog.component";

interface Dashboard {
  assets: number;
  liabilities: number;
  balance: number;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public accounts$ = new BehaviorSubject<Account[] | null>(null);
  public dashboard$ = new BehaviorSubject<Dashboard | null>(null);

  constructor(
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAccounts();

    this.accounts$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(accounts => {
        if (accounts && accounts.length > 0) {
          this.calculateBalance(accounts)
        }
      })
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

  calculateBalance(accounts: Account[]): void {
    const dashboard = {
      assets: 0,
      liabilities: 0,
      balance: 0
    };

    accounts.forEach(account => {
      if (account.amount > 0) {
        dashboard.assets += account.amount;
      } else {
        dashboard.liabilities -= account.amount;
      }
    });

    dashboard.balance = dashboard.assets - dashboard.liabilities;

    this.dashboard$.next(dashboard);

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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Confirm',
        message: `Are you sure you want to delete the account?`
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.data.deleteAccount(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.getAccounts());
      }
    });
  }
}
