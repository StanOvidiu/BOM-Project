import { Component } from '@angular/core';
import { BindingSocket, BindingSocketProducerInner, DefaultService } from '../generated';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BindingSocketServiceService } from '../binding-socket-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bom-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bom-pop-up.component.html',
  styleUrl: './bom-pop-up.component.css'
})
export class BOMPopUpComponent {

  producersList:Array<BindingSocketProducerInner> = [];
  bindingsocket: BindingSocket = {};
  selectedSupplier: string|undefined = '';

  constructor(public dialogRef:MatDialog, private router: Router, private bindingSocketService: BindingSocketServiceService, private service: DefaultService){}

  ngOnInit(): void {
    this.bindingSocketService.currentBindingSocket.subscribe(data =>{
      if(data){
        this.bindingsocket = data;
        this.producersList = this.bindingsocket.producer ? this.bindingsocket.producer : [];
      }
    });
    console.log(this.producersList);
  }

  closeDialog()
  {
    this.dialogRef.closeAll();
  }

  closeOnOverlayClick(event : Event){
    this.closeDialog();
  }

  selectSupplier(index: number, event : Event){
    if(this.producersList[index].name != null){
      this.selectedSupplier = this.producersList[index].name;
      sessionStorage.setItem('selectedSupplier',this.selectedSupplier ? this.selectedSupplier : "");
      console.log(this.selectedSupplier)
    }
  }
}
