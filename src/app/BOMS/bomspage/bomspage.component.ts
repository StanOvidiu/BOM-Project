import { Component } from '@angular/core';
import { DefaultService } from '../../generated';
import { Router } from '@angular/router';
import { Bom } from '../../generated/model/bom';
import { CommonModule } from '@angular/common';
import { BomService } from '../../bom.service';

@Component({
  selector: 'app-bomspage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bomspage.component.html',
  styleUrl: './bomspage.component.css'
})
export class BomspageComponent {

  listOfBoms: Bom[] = [];

  constructor(private service:DefaultService, private router: Router, private bomService: BomService){

  }

  ngOnInit(){
    this.service.getAllBoms().subscribe(data => {
      this.listOfBoms = data;
      console.log(this.listOfBoms);
    })
  }

  redirectToBomDetails(index: number){
    this.bomService.changeBindingSocket(this.listOfBoms[index]);
    this.router.navigate(['/bomDetails']);
  }
}
