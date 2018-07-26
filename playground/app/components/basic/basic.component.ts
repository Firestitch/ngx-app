import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BasicDialogComponent} from './../basic-dialog';

@Component({
  selector: 'basic-example',
  templateUrl: 'basic.component.html'
})
export class BasicComponent {

  public dialogRef;
  constructor(private dialog: MatDialog) {}

  public open() {
    this.dialogRef = this.dialog.open(BasicDialogComponent, {
      data: { }
    });

    this.dialogRef.afterClosed().subscribe(response => {

    });
  }

  close(data = null) {
    this.dialogRef.close(data);
  }
}
