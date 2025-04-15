import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../shared/models";

interface IEditCategory {
  parentCategories: Category[];
  category?: Category;
}

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  readonly data = inject<IEditCategory>(MAT_DIALOG_DATA);

  categoryTypes = [
    { value: 0, label: 'Expense' },
    { value: 1, label: 'Income' },
    { value: 2, label: 'Transfer' }
  ];

  public form: FormGroup = this.formBuilder.group({
    type: [0, Validators.required],
    name: ['', Validators.required],
    icon: ['shopping_cart'],
    parentCategory: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCategoryComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.category) {
      this.form.setValue(this.data.category);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
