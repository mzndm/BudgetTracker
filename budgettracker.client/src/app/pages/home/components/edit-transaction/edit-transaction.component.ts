import {Component, inject, OnInit} from '@angular/core';
import {Account, Category, Transaction} from "../../../../shared/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

interface IEditTransaction {
  transaction?: Transaction;
  accounts: Account[];
  categories: Category[];
}

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.css'
})
export class EditTransactionComponent implements OnInit {
  readonly data = inject<IEditTransaction>(MAT_DIALOG_DATA);

  transactionTypes = [
    { value: 0, label: 'Expense' },
    { value: 1, label: 'Income' },
    { value: 2, label: 'Transfer' }
  ];

  public form: FormGroup = this.formBuilder.group({
    amount: ['', [Validators.required, Validators.min(0)]],
    type: [0, [Validators.required]],
    accountId: ['', Validators.required],
    accountName: [''],
    categoryId: ['', Validators.required],
    categoryName: [''],
    categoryIcon: [''],
    note: [''],
    accountIdTo: [null],
    accountNameTo: [null],
  });

  parentCategoryIdControl = new FormControl(0);

  parentCategories$ = new BehaviorSubject<Category[]>([]);
  subCategories$ = new BehaviorSubject<Category[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditTransactionComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.transaction) {
      this.form.setValue(this.data);
    } else {
      this.prefillForm();
    }

    if (this.data.categories) {
      this.typeChanged(0);
    }
  }

  prefillForm(): void {
    const defaultParentCategory = this.data.categories.find(category => category.parentCategory === null && category.type === 0);

    const defaultCategory = this.data.categories.find(category => category.parentCategory === defaultParentCategory?.id);

    const defaultValues = {
      amount: 0,
      type: 0,
      accountId: this.data.accounts[0].id,
      accountName: this.data.accounts[0].name,
      categoryId: defaultCategory?.id,
      categoryName: defaultCategory?.name,
      categoryIcon: defaultCategory?.icon,
      note: '',
      accountIdTo: null,
      accountNameTo: null,
    };

    this.parentCategoryIdControl.setValue(defaultParentCategory!.id);
    this.form.setValue(defaultValues);
    this.parentChanged(defaultParentCategory!.id);
  };

  setFormValue(control: string, value: any): void {
    this.form.controls[control].setValue(value);
  }

  typeChanged(typeId: number): void {
    const parents = this.data.categories.filter(c => {
      return c.type === typeId && c.parentCategory === null;
    });
    this.parentCategories$.next(parents);
  }

  parentChanged(categoryId: number): void {
    const children = this.data.categories.filter(c => c.parentCategory === categoryId);
    this.subCategories$.next(children);
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
