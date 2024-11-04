import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Categories } from '../../generated/model/categories';
import { Router } from '@angular/router';
import { CategoriesService } from '../../categories.service';
import { DefaultService } from '../../generated/api/default.service';
import { SubcategoriesService } from '../../subcategories.service';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css'
})
export class SubcategoriesComponent {


  imagePath:string = 'assets/PngItem_411992.png'

  category:Categories = {subcategories: []}

  constructor(private router: Router, private categriesService: CategoriesService, private sService: SubcategoriesService, private service: DefaultService){

  }

  ngOnInit(): void {
    this.categriesService.currentCategory.subscribe(data =>{
      if(data){
        this.category = data;
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

  redirectToItems(index: number) {
    const selectedSubcategory = this.category.subcategories[index];

    this.sService.changeSubcategory(selectedSubcategory);

    sessionStorage.setItem('subcategory',selectedSubcategory);

    this.router.navigate(['/bindingSocket']);
    }
}
