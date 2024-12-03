import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DefaultService } from '../generated/api/default.service';
import { CategoriesService } from '../categories.service';
import { Subcategories } from '../generated/model/subcategories';
import { Categories } from '../generated/model/categories';

@Component({
  selector: 'app-category-pop-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-pop-up.component.html',
  styleUrl: './category-pop-up.component.css'
})
export class CategoryPopUpComponent {
  category = {
    name: '',
    subcategories: [] as Subcategories[],
    image: ''
  };
 
  // newSubcategory = {
  //   name: '',
  //   image: ''
  // };

  listOfCategories:Categories[] = [];

  constructor(public dialogRef: MatDialogRef<CategoryPopUpComponent>,private service: DefaultService, private categriesService: CategoriesService) {}

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.category.image = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
        // this.newSubcategory.image = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
      };
      reader.readAsDataURL(file);
    }
  }

  // addSubcategories(input: string) {
  //   if (!input) return;
  //   const newSubcategories = input.split(',').map((name, index) => ({
  //     id: this.category.subcategories.length + index + 1, 
  //     name: name.trim(),
  //     image: this.newSubcategory.image
  //   }));
  //   this.category.subcategories.push(...newSubcategories);
  // }

  saveCategory() {

    if (this.category.name) {
      this.category.name = this.capitalizeFirstLetter(this.category.name);
  }

    if (!this.category || !this.category.name) {
      console.error('Category name is not defined!');
      return;
    }

    const confirmAdd = window.confirm('Are you sure you want to add this new category?');
    if (confirmAdd) {
      this.service.createCategory(this.category).subscribe({
        next: (response) => {
          console.log('Category created successfully:', response);
          this.category = { name: '', subcategories: [], image: '' }; 
          this.dialogRef.close(response);
          
        },
        error: (err) => {
          console.error('Error creating category:', err);
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
