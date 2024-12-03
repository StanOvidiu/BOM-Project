import { Component } from '@angular/core';
import { Bomcomponent } from '../../generated/model/bomcomponent';
import { Router } from '@angular/router';
import { BomService } from '../../bom.service';
import { BindingSocketServiceService } from '../../binding-socket-service.service';
import { BindingSocket, DefaultService } from '../../generated';
import { Bom } from '../../generated/model/bom';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from '../../BindingSocketFolder/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { BOMPopUpComponent } from '../../bom-pop-up/bom-pop-up.component';

@Component({
  selector: 'app-bomdetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bomdetails.component.html',
  styleUrl: './bomdetails.component.css'
})
export class BomdetailsComponent {

  public bom:Bom = {
    componentIDs: []
  };

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
    });

    this.service.getComponents(this.bom._id).subscribe(data => {
      this.componentList = data;
      console.log("da");
    })
  }

  openDialog(index: number, event: Event){
    this.bindingSocketService.changeBindingSocket(this.componentList[index]);
    this.dialogRef.open(BOMPopUpComponent);
  }


  toggleEdit() {
    this.isEditing = !this.isEditing; // Toggle edit mode
  }

  saveBOM() {
    if (!this.bom._id) {
      console.error("BOM ID is not defined!");
      return;
    }

    this.service.updateBOM(this.bom._id, this.bom).subscribe({
      next: (response) => {
        console.log("BOM updated successfully:", response);
        this.isEditing = false; // Exit edit mode
      },
      error: (err) => {
        console.error("Error updating BOM:", err);
      },
    });
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