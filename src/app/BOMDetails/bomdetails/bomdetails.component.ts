import { Component } from '@angular/core';
import { Bomcomponent } from '../../generated/model/bomcomponent';
import { Router } from '@angular/router';
import { BomService } from '../../bom.service';
import { BindingSocketServiceService } from '../../binding-socket-service.service';
import { BindingSocket, DefaultService } from '../../generated';
import { Bom } from '../../generated/model/bom';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from '../../BindingSocketFolder/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { BOMPopUpComponent } from '../../bom-pop-up/bom-pop-up.component';
import { Variant } from '../../generated/model/variant';

@Component({
  selector: 'app-bomdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bomdetails.component.html',
  styleUrl: './bomdetails.component.css'
})
export class BomdetailsComponent {

  public bom:Bom = {
    components: [
      {
        suppliers: []
      }
    ]
  };

  public variants: Variant[] = [];
  public componentList: BindingSocket[] = [];
  public isEditing = false;

  constructor(private router: Router, private dialogRef: MatDialog, private bindingSocketService: BindingSocketServiceService, private bomService: BomService, private service: DefaultService) {
    
  }

  ngOnInit(): void {
    this.bomService.currentBomID.subscribe(data =>{
      if(data){
        this.bom._id = data;
        sessionStorage.setItem('bom_id', JSON.stringify(data));
      }
      else{
        const storedCategory = sessionStorage.getItem('bom_id');
        if(storedCategory!== null){
          this.bom._id = JSON.parse(storedCategory);
        }
      }
    });

    this.service.getBomById(this.bom._id).subscribe(data => {
      this.bom = data;
      console.log(data._id);
    });

    this.service.getBomSuppliersById(this.bom._id).subscribe(data => {
      this.bom.components = data;
      console.log(data);
    });

    this.service.getVariantsForSpecificBOM(this.bom._id).subscribe(data => {
      this.variants = data;
    })
  }

  openDialog(index: number, event: Event){
    this.bomService.changeProduct(this.bom.components[index]);
    this.bomService.changeBindingSocket(this.bom._id);
    this.dialogRef.open(BOMPopUpComponent);
  }

  onTextChange(event: Event, index: number){
    const input = event.target as HTMLInputElement;
    const newQuantity = Number(input.value);
    console.log('Quantity updated:', newQuantity);
    this.service.setQuantity(this.bom.components[index].componentId, this.bom._id, newQuantity).subscribe();
  }

  onVariantTextChange(event: Event, index: number, variant: Variant){
    const input = event.target as HTMLInputElement;
    const newQuantity = Number(input.value);
    console.log('Quantity updated:', newQuantity);
    this.service.setVariantQuantity(variant._id, variant.components[index].componentId, newQuantity).subscribe();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; // Toggle edit mode
  }

  createVariant(){
    const name = (document.getElementById('variantName') as HTMLInputElement).value;
    this.service.createVariant(this.bom._id, name).subscribe();
  }

  selectAsDefault(){
    this.service.selectAsDefault(this.bom._id).subscribe({
      next: response => {
          console.log("Success:", response);
      },
      error: err => {
          console.error("Error from backend:", err);
      }
  });
    window.location.reload();
  }

}
