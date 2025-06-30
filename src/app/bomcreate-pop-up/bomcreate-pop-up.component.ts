import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DefaultService } from '../generated';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-bomcreate-pop-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bomcreate-pop-up.component.html',
  styleUrl: './bomcreate-pop-up.component.css'
})
export class BOMCreatePopUpComponent {

  name: string = '';

  constructor(public dialogRef: MatDialogRef<BOMCreatePopUpComponent>, private service: DefaultService){}


  saveBOM(){
    if (this.name) {
      this.name = this.capitalizeFirstLetter(this.name);
    }

    const confirmAdd = window.confirm('Are you sure you want to add this BOM?');
    if(confirmAdd){
      this.service.createBOM(this.name)
        .subscribe(
          (response) => {
            console.log('BOM created successfully:', response);
            this.onAdd();
            window.location.reload();
          },
          (error) => {
            console.error('Error creating BOM:', error);
          }
        )
    }
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onAdd() {
    this.dialogRef.close();
  }
}
