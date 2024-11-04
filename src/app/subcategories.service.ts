import { Injectable } from '@angular/core';
import { SubcategoriesComponent } from './Catalogue/subcategories/subcategories.component';
import { BehaviorSubject } from 'rxjs';
import { Subcategories } from './generated/model/subcategories';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  private subcategorySource = new BehaviorSubject<string | null>(null);
  currentSubcategory = this.subcategorySource.asObservable();

  changeSubcategory(subcategory: string) {
    this.subcategorySource.next(subcategory);
  }
  
  constructor() { }
}
