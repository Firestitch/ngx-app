import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'basic-dialog',
  templateUrl: 'basic-dialog.component.html'
})
export class BasicDialogComponent {

  public object = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<BasicDialogComponent>) {}

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
