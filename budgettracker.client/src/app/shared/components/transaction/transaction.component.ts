import { Component, Input } from '@angular/core';
import { MonobankTransaction, Transaction } from '../../models';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  @Input() transaction!: Transaction | MonobankTransaction;

  get categoryIcon(): string | undefined {
    const anyTransaction = this.transaction as unknown as { categoryIcon?: string };
    return anyTransaction.categoryIcon;
  }

  private isAppTransaction(value: Transaction | MonobankTransaction): value is Transaction {
    return (value as Transaction).type !== undefined;
  }

  get displayTitle(): string | undefined {
    if (this.isAppTransaction(this.transaction)) {
      return this.transaction.categoryName;
    }
    return this.transaction.description ?? this.transaction.counterName ?? undefined;
  }

  get displayNote(): string | undefined {
    if (this.isAppTransaction(this.transaction)) {
      return this.transaction.note;
    }
    return this.transaction.comment ?? this.transaction.description ?? undefined;
  }

  get isIncome(): boolean {
    if (this.isAppTransaction(this.transaction)) {
      return this.transaction.type === 1;
    }
    return this.transaction.amount > 0;
  }

  get isTransfer(): boolean {
    if (this.isAppTransaction(this.transaction)) {
      return this.transaction.type === 2;
    }
    return false;
  }

  get displayAccount(): string | undefined {
    if (this.isAppTransaction(this.transaction)) {
      return this.transaction.accountName;
    }
    return this.transaction.counterName ?? undefined;
  }

  get displayAccountTo(): string | undefined {
    if (this.isAppTransaction(this.transaction)) {
      return this.transaction.accountNameTo;
    }
    return undefined;
  }
}
