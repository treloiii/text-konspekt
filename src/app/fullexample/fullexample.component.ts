import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-fullexample',
  templateUrl: './fullexample.component.html',
  styleUrls: ['./fullexample.component.css']
})
export class FullexampleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FullexampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
