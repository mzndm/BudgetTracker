import {Statuses} from "./enums";

export enum AccountTypes {
  CASH,
  CARD,
  BANK,
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
}
