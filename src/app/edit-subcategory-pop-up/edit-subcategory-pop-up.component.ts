import { Component, Inject } from '@angular/core';
import { Categories } from '../generated/model/categories';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subcategories } from '../generated/model/subcategories';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-subcategory-pop-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-subcategory-pop-up.component.html',
  styleUrl: './edit-subcategory-pop-up.component.css'
})
export class EditSubcategoryPopUpComponent {
  subcategory: Subcategories;

  constructor(
    public dialogRef: MatDialogRef<EditSubcategoryPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subcategories
  ) {
    this.subcategory = { ...data }; 
    console.log('Loaded subcategory in dialog:', this.subcategory);
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.subcategory.image = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
      };
      reader.readAsDataURL(file);
    }
  }


  save(): void {
    if (!this.subcategory.name || !this.subcategory.image) {
      console.error('Name and Image are required');
      return;
    }

    console.log('Saving subcategory:', this.subcategory);
    this.dialogRef.close(this.subcategory); 
  }

  cancel(): void {
    this.dialogRef.close(null); 
  }

}
