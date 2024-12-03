import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Categories } from '../../generated/model/categories';
import { Subcategories } from '../../generated/model/subcategories';
import { Router } from '@angular/router';
import { CategoriesService } from '../../categories.service';
import { DefaultService } from '../../generated/api/default.service';
import { SubcategoriesService } from '../../subcategories.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SubcategoryPopUpComponent } from '../../subcategory-pop-up/subcategory-pop-up.component';
import { FormsModule } from '@angular/forms';
import { EditSubcategoryPopUpComponent } from '../../edit-subcategory-pop-up/edit-subcategory-pop-up.component';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css'
})
export class SubcategoriesComponent {

  

  // Subcategories
  category:Categories = {subcategories: []}
 
  constructor(private dialog: MatDialog,private router: Router, private categriesService: CategoriesService, private sService: SubcategoriesService, private service: DefaultService){
 
  
  }

  ngOnInit(): void {
    this.categriesService.currentCategory.subscribe(data =>{
      if(data){
        this.category = data;
        console.log(data);
        sessionStorage.setItem('category', JSON.stringify(data));
      }
      else{
        const storedCategory = sessionStorage.getItem('category');
        if(storedCategory!== null){
          this.category = JSON.parse(storedCategory);
        }
      }
    });

    
  }


  openAddCategoryDialog(categoryId: string, currentSubcategories: any[]) {
    const dialogRef = this.dialog.open(SubcategoryPopUpComponent, {
      width: '400px',
      data: {
        categoryId: categoryId,
        subcategories: currentSubcategories
      }
    });
  
    dialogRef.afterClosed().subscribe((newSubcategory: Subcategories | null) => {
      if (newSubcategory) {
        console.log('Adding new subcategory:', newSubcategory);
        
          this.service.addSubcategory(categoryId, newSubcategory).subscribe({
            next: () => {
              console.log('Subcategory added successfully.');
              this.category.subcategories.push(newSubcategory);
            },
            error: (err) => {
              console.error('Error adding subcategory:', err);
            }
          });     
      }
    });
  }
  
  openEditDialog(categoryId: string, subcategory: Subcategories): void {
    const dialogRef = this.dialog.open(EditSubcategoryPopUpComponent, {
      data: subcategory
    });

    dialogRef.afterClosed().subscribe((updatedSubcategory: Subcategories | null) => {
      if (updatedSubcategory) {
        console.log('Updating subcategory:', updatedSubcategory);
        const confirmEdit = window.confirm('Are you sure you want to edit this Subcategory?');
        if (confirmEdit) {
          this.service
            .updateSubcategory(categoryId, subcategory.name, updatedSubcategory)
            .subscribe({
              next: (response) => {
                console.log('Subcategory updated successfully:', response);
                const index = this.category.subcategories.findIndex(sc => sc.name === subcategory.name);
                if (index !== -1) {
                this.category.subcategories[index] = updatedSubcategory;
              }
              },
              error: (error) => {
                console.error('Error updating subcategory:', error);
              }
            });
        }
      }
    });
  }

  deleteSubcategory(categoryId: string, subcategoryName: string) {
    if (!categoryId || !subcategoryName) {
      console.error('Both Category ID and Subcategory Name are required to delete a subcategory.');
      return;
    }
  
    const confirmDelete = window.confirm('Are you sure you want to delete this?');
    if (confirmDelete) {
      this.service.deleteSubcategory(categoryId, subcategoryName).subscribe({
        next: () => {
          console.log('Subcategory deleted successfully.');
          this.category.subcategories = this.category.subcategories.filter(sc => sc.name !== subcategoryName);
        },
        error: (err) => {
          console.error('Error deleting subcategory:', err);
        }
      });
   }
  }
  
  

  redirectToItems(index: number) {
    const selectedSubcategory = this.category.subcategories[index];
 
    this.sService.changeSubcategory(selectedSubcategory); 
 
    sessionStorage.setItem('subcategory',selectedSubcategory.name);
 
    this.router.navigate(['/bindingSocket']);
    }
}
