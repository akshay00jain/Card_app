import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/card.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {
  form = this.fb.group({
    description: [this.data.description, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private fb: FormBuilder
  ) {}

  onSave() {
    if (this.form.valid) {
      const updatedCard = { ...this.data, description: this.form.value.description };
      this.dialogRef.close(updatedCard);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}