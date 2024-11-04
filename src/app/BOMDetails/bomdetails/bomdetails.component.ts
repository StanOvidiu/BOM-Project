import { Component } from '@angular/core';
import { Bomcomponent } from '../../generated/model/bomcomponent';
import { Router } from '@angular/router';
import { BomService } from '../../bom.service';
import { DefaultService } from '../../generated';
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
    components: []
  };

  constructor(private router: Router, private bomService: BomService, private service: DefaultService) {
    
  }

  ngOnInit(): void {
    this.bomService.currentBom.subscribe(data =>{
      if(data){
        this.bom = data;
      }
    });
  }
}
