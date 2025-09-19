import { Pipe, PipeTransform } from '@angular/core';
import { Account, AccountTypes, MonobankAccount } from '../models/account';

@Pipe({
  name: 'accountName',
  standalone: false,
  pure: true
})
export class AccountNamePipe implements PipeTransform {
  transform(
    accountId: number | string | undefined, 
    accounts: Account[] | MonobankAccount[] ): string {

    if (accountId == null || !Array.isArray(accounts) || accounts.length === 0) {
      return '';
    }

    const account = accounts.find(a => a.id === accountId);
    if (!account) {
      return '';
    }

    if (account.name || account.type) {
      return account.name || account.type?.toString() || '';
    }

    return ''
  }
}


