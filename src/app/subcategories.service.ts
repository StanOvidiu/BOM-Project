import { Injectable } from '@angular/core';
import { SubcategoriesComponent } from './Catalogue/subcategories/subcategories.component';
import { BehaviorSubject } from 'rxjs';
import { Subcategories } from './generated/model/subcategories';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  private subcategorySource = new BehaviorSubject<Subcategories | null>(null);
  currentSubcategory = this.subcategorySource.asObservable();

  changeSubcategory(subcategory: Subcategories) {
    this.subcategorySource.next(subcategory);
  }
  
  constructor() { }
}
