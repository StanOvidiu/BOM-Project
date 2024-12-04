import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultService } from '../generated';
import { Router } from '@angular/router';
import { Supplier } from '../generated/model/supplier';

@Component({
  selector: 'app-suppliers-contact',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './suppliers-contact.component.html',
  styleUrl: './suppliers-contact.component.css'
})
export class SuppliersContactComponent {

  listOfSuppliers:Supplier[] = [];

  constructor(private service:DefaultService, private router: Router){}

  ngOnInit() {
    this.service.getSuppliers().subscribe(
        data => {
            this.listOfSuppliers = data;
        },
        error => {
            console.error('Error fetching categories:', error);
        }
    );
  }
}
