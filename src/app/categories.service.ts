import { Injectable } from '@angular/core';
import { Categories } from './generated/model/categories';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  private categorySource = new BehaviorSubject<Categories | null>(null);
  currentCategory = this.categorySource.asObservable();

  changeCategory(category: Categories) {
    this.categorySource.next(category);
  }
  
  constructor() { }
}
