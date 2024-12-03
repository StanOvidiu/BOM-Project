import { Injectable } from '@angular/core';
import { Bom } from './generated/model/bom';
import { BehaviorSubject } from 'rxjs';
import { BOMPopUpComponent } from './bom-pop-up/bom-pop-up.component';
import { Bomcomponent } from './generated/model/bomcomponent';

@Injectable({
  providedIn: 'root'
})
export class BomService {

  private bomIdSource = new BehaviorSubject<string | null>(null);
  currentBomID = this.bomIdSource.asObservable();

  changeBindingSocket(bomId: string){
    this.bomIdSource.next(bomId);
  }

  private bomProductSource = new BehaviorSubject<Bomcomponent | null>(null);
  currentBomProduct = this.bomProductSource.asObservable();

  changeProduct(productId: Bomcomponent){
    this.bomProductSource.next(productId);
  }

  constructor() { }
}
