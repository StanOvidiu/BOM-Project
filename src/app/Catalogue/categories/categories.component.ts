import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from '../../generated/model/categories';
import { DefaultService } from '../../generated/api/default.service';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../categories.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryPopUpComponent } from '../../category-pop-up/category-pop-up.component';
import { EditCategoryPopUpComponent } from '../../edit-category-pop-up/edit-category-pop-up.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  imagePath:string = 'assets/PngItem_411992.png'

  listOfCategories:Categories[] = [];

  constructor(private dialog: MatDialog, private service:DefaultService, private router: Router, private categoriesService: CategoriesService){}

  ngOnInit() {
    this.service.getCategories().subscribe(
        data => {
            this.listOfCategories = data;
            console.log(data);
        },
        error => {
            console.error('Error fetching categories:', error);
        }
    );
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryPopUpComponent, {
      width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.service.createCategory(result).subscribe(response => {
        console.log('Categorie adăugată cu succes:', response);
        this.listOfCategories.push(response);
      });
    }
  });
}

redirectToSuppliersContact(){
  this.router.navigate(['/Contact'])
}


openEditCategoryDialog(category: Categories): void {
  console.log('Opening dialog with category:', category); 
  if (!category._id) {
    console.error('Category ID is missing!');
    return;
  }

  const dialogRef = this.dialog.open(EditCategoryPopUpComponent, {
    width: '400px',
    data: category 
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result._id) { 
      console.log('Result after dialog close:', result); 
      const confirmEdit = window.confirm('Are you sure you want to edit this category?');
      if (confirmEdit) {
          this.service.updateCategory(result._id, result).subscribe({
            next: (response) => {
              console.log('Category updated successfully:', response);

              const index = this.listOfCategories.findIndex(c => c._id === result._id);
              if (index !== -1) {
                this.listOfCategories[index] = result;
              }
            },
            error: (err) => {
              console.error('Error updating category:', err);
            }
          });
       }
    } else {
      console.error('Invalid result returned from dialog:', result);
    }
  });
}

deleteCategory(categoryId: string) {
  if (!categoryId) {
    console.error('Category ID is required to delete a category.');
    return;
  }

  const confirmDelete = window.confirm('Are you sure you want to delete this?');
  if (confirmDelete) {
    this.service.deleteCategory(categoryId).subscribe({
      next: () => {
        console.log('Category deleted successfully.');
        this.listOfCategories = this.listOfCategories.filter(c => c._id !== categoryId);
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      
      }
    });
  }
}


  redirectToSubcategories(index: number) {
    this.categoriesService.changeCategory(this.listOfCategories[index]);
    this.router.navigate(['/subcategories'])
  }

}
