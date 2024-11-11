import { Component, Inject, Output, EventEmitter } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Template } from '../template/template.model';
@Component({
  selector: 'app-template-dialog',
  templateUrl: 'dialog.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class DialogComponent {
  templateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { template: Template | null }
  ) {
    this.templateForm = this.fb.group({
      templateText: [data.template?.templateText || '', Validators.required],
      preview: [
        JSON.stringify(data.template?.preview || {}, null, 2),
        Validators.required,
      ],
    });
  }

  onSave(): void {
    const templateData = {
      templateText: this.templateForm.value.templateText,
      preview: JSON.parse(this.templateForm.value.preview),
    };
    this.dialogRef.close(templateData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
