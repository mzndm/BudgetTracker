import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Account} from "../../../../shared/models";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent implements OnInit {
  readonly data = inject<Account>(MAT_DIALOG_DATA);

  accountTypes = [
    { value: 0, label: 'Cash' },
    { value: 1, label: 'Card' },
    { value: 2, label: 'Bank' }
  ];

  public form: FormGroup = this.formBuilder.group({
    type: [0, [Validators.required]],
    name: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditAccountComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.setValue(this.data);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
