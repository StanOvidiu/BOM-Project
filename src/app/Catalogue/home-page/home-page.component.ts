import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from '../../generated/model/categories';
import { DefaultService } from '../../generated/api/default.service';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../categories.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
  imagePath:string = 'assets/PngItem_411992.png'

  listOfCategories:Categories[] = [];

  constructor(private service:DefaultService, private router: Router, private categoriesService: CategoriesService){

  }

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

  redirectToSubcategories(index: number) {
    this.categoriesService.changeCategory(this.listOfCategories[index]);
    this.router.navigate(['/subcategories'])
  }

}
