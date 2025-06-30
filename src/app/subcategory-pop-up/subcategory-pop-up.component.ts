import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DefaultService } from '../generated/api/default.service';
import { CategoriesService } from '../categories.service';
import { SubcategoriesService } from '../subcategories.service';
import { Subcategories } from '../generated/model/subcategories';
import { Categories } from '../generated/model/categories';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-subcategory-pop-up',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './subcategory-pop-up.component.html',
  styleUrl: './subcategory-pop-up.component.css'
})
export class SubcategoryPopUpComponent {
  category = {
    id:'',
    name: '',
    subcategories: [] as Subcategories[],
    image: ''
  };


  newSubcategory = {
    name: '',
    image: ''
  };

  constructor(public dialogRef: MatDialogRef<SubcategoryPopUpComponent>,private service: DefaultService, private categriesService: CategoriesService, private sService: SubcategoriesService,  @Inject(MAT_DIALOG_DATA) public data: any) {}

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newSubcategory.image = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
      };
      reader.readAsDataURL(file);
    }
  }

  saveSubcategory() {
    if (!this.newSubcategory.name) {
      console.error('Subcategory name is missing!');
      return;
    }
  
    const categoryId = this.data.categoryId; // Extragem ID-ul categoriei din datele dialogului
    const subcategory = { ...this.newSubcategory };
  
    const confirmEdit = window.confirm('Are you sure you want to add this subcategory?');
          if (confirmEdit) {
            this.service.addSubcategory(categoryId, subcategory).subscribe({
              next: (response) => {
                console.log('Subcategory added successfully:', response);
                this.dialogRef.close(subcategory); 
              },
              error: (err) => {
                console.error('Error adding subcategory:', err);
              }
            });
         }
  }
  
  
  
  

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

  onCancel() {
    this.dialogRef.close(null);
  }

  onAdd() {
    this.dialogRef.close(this.category);

  }
}
