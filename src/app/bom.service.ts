import { Injectable } from '@angular/core';
import { Bom } from './generated/model/bom';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BomService {

  private bomIdSource = new BehaviorSubject<string | null>(null);
  currentBomID = this.bomIdSource.asObservable();

  changeBindingSocket(bomId: string){
    this.bomIdSource.next(bomId);
  }

  constructor() { }
}
