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

export interface MonobankTransaction {
  id: string;
  accountId?: string;
  time: number;
  description?: string;
  mcc?: number;
  originalMcc?: number;
  hold?: boolean;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate?: number;
  cashbackAmount?: number;
  balance?: number;
  comment?: string;
  receiptId?: string;
  invoiceId?: string;
  counterEdrpou?: string;
  counterIban?: string;
  counterName?: string;
  owner?: string; // User.Id
}

export interface TransactionHttpParams {
  startDate?: Date,
  endDate?: Date
}
