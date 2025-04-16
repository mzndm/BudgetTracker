import {OperationTypes, Statuses} from "./enums";

export interface Transaction {
  id: number;
  type: OperationTypes; // "expense" = 0, "income" = 1, "transfer" = 2
  amount: number;
  accountId: number;
  accountName: string;
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  date: Date;
  accountIdTo: number;
  accountNameTo: string;
  note: string;
  status: Statuses; // "Active" = 1, "Inactive" = 0
  owner: string; // User.Id
  changed: Date;
}

export interface TransactionHttpParams {
  startDate?: Date,
  endDate?: Date
}
