import {Statuses} from "./enums";

export enum AccountTypes {
  CASH,
  CARD,
  BANK,
}

export enum AccountProvider {
  MANUAL,
  MONOBANK,
  PRIVATBANK,
}

export interface Account {
  id: number;
  type: AccountTypes; // "cash" = 0, "card" = 1, "bank" = 2
  name: string;
  amount: number;
  currency: string;
  status: Statuses; // "Active" = 1, "Inactive" = 0
  owner: string; // User.Id
  changed: Date;
  provider: AccountProvider;
}

export interface MonobankAccount {
  id: string;
  name?: string;
  sendId: string;
  balance: number;
  creditLimit: number;
  type?: string;
  currencyCode: number;
  cashbackType?: string;
  maskedPan?: string[];
  iban?: string;
  owner?: string;
  provider: AccountProvider;
}
