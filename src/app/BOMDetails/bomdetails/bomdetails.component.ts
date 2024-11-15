import { Component } from '@angular/core';
import { Bomcomponent } from '../../generated/model/bomcomponent';
import { Router } from '@angular/router';
import { BomService } from '../../bom.service';
import { BindingSocket, DefaultService } from '../../generated';
import { Bom } from '../../generated/model/bom';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bomdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bomdetails.component.html',
  styleUrl: './bomdetails.component.css'
})
export class BomdetailsComponent {

  public bom:Bom = {
    componentIDs: []
  };

  public componentList: BindingSocket[] = [];

  constructor(private router: Router, private bomService: BomService, private service: DefaultService) {
    
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

  selectAsDefault(){
    this.service.selectAsDefault(this.bom._id).subscribe({
      next: response => {
          console.log("Success:", response);
      },
      error: err => {
          console.error("Error from backend:", err);
      }
  });
  }
}
