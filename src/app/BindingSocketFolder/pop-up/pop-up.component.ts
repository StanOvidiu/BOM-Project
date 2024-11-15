import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BindingSocketServiceService } from '../../binding-socket-service.service';
import { BindingSocket, BindingSocketProducerInner, DefaultService } from '../../generated';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {

  producersList:Array<BindingSocketProducerInner> = [];
  bindingsocket: BindingSocket = {};

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
}

