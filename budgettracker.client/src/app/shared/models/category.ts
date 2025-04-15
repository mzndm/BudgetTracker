import {Statuses} from "./account";

export enum CategoryTypes {
  EXPENSE,
  INCOME,
  TRANSFER,
}

export interface Category {
  id: number;
  type: CategoryTypes;
  name: string;
  icon: string;
  parentCategory: number | null;
  status: Statuses; // "Active" = 1, "Inactive" = 0
  owner: string; // User.Id
  changed: Date;
}
