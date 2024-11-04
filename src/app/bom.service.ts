import { Injectable } from '@angular/core';
import { Bom } from './generated/model/bom';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BomService {

  private bomSource = new BehaviorSubject<Bom | null>(null);
  currentBom = this.bomSource.asObservable();

  changeBindingSocket(bindingsocket: Bom){
    this.bomSource.next(bindingsocket);
  }

  constructor() { }
}
