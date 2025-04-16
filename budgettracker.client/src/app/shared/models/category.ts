import {OperationTypes, Statuses} from "./enums";

export interface Category {
  id: number;
  type: OperationTypes; // "expense" = 0, "income" = 1, "transfer" = 2
  name: string;
  icon: string;
  parentCategory: number | null;
  status: Statuses; // "Active" = 1, "Inactive" = 0
  owner: string; // User.Id
  changed: Date;
}
