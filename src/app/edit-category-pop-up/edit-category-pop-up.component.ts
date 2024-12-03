import { Component, Inject } from '@angular/core';
import { Categories } from '../generated/model/categories';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subcategories } from '../generated/model/subcategories';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category-pop-up',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './edit-category-pop-up.component.html',
  styleUrls: ['./edit-category-pop-up.component.css']
})
export class EditCategoryPopUpComponent {
  category: Categories;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categories 
  ) {
    this.category = { ...data }; 
    console.log('Loaded category in dialog:', this.category); 
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.category.image = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    if (!this.category.name || !this.category.image) {
      console.error('Name and Image are required');
      return;
    }

    console.log('Saving category:', this.category); 
    this.dialogRef.close(this.category); 
  }

  cancel(): void {
    this.dialogRef.close(null); 
  }
}
