import { Component } from '@angular/core';
import { BindingSocket, BindingSocketProducerInner, DefaultService } from '../generated';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BindingSocketServiceService } from '../binding-socket-service.service';
import { CommonModule } from '@angular/common';
import { BomService } from '../bom.service';
import { Bomcomponent } from '../generated/model/bomcomponent';

@Component({
  selector: 'app-bom-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bom-pop-up.component.html',
  styleUrl: './bom-pop-up.component.css'
})
export class BOMPopUpComponent {

  currentBomId: string|undefined = "";
  producersList:Array<BindingSocketProducerInner> = [];
  selectedSupplier: string|undefined = '';
  activeProduct:Bomcomponent = {
    suppliers: []
  };

  constructor(public dialogRef:MatDialog, private router: Router, private bindingSocketService: BindingSocketServiceService, private bomService: BomService, private service: DefaultService){}

  ngOnInit(): void {
    this.bomService.currentBomProduct.subscribe(data =>{
      if(data){
        this.activeProduct = data;
        this.producersList = this.activeProduct.suppliers ? this.activeProduct.suppliers : [];
      }
    });
    this.bomService.currentBomID.subscribe(data =>{
      if(data){
        this.currentBomId = data;
        this.producersList = this.activeProduct.suppliers ? this.activeProduct.suppliers : [];
      }
    });
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
    }

    this.service.setSelectedSupplier(this.currentBomId?this.currentBomId:"", this.activeProduct.componentId?this.activeProduct.componentId:"", this.selectedSupplier).subscribe();
    this.dialogRef.closeAll();
    window.location.reload();
  }
}
