import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Datum } from '../../interface/champ.interface';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styles: ``
})

export class ConfigDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfigDialogComponent>);
  readonly data = inject<Datum>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}