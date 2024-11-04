import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BindingSocket } from './generated';

@Injectable({
  providedIn: 'root'
})
export class BindingSocketServiceService {
  private bindingSocketSource = new BehaviorSubject<BindingSocket | null>(null);
  currentBindingSocket = this.bindingSocketSource.asObservable();

  changeBindingSocket(bindingsocket: BindingSocket){
    this.bindingSocketSource.next(bindingsocket);
  }

  constructor() { }
}
