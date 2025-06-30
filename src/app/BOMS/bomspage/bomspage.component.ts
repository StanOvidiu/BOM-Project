import { Component } from '@angular/core';
import { DefaultService } from '../../generated';
import { Router } from '@angular/router';
import { Bom } from '../../generated/model/bom';
import { CommonModule } from '@angular/common';
import { BomService } from '../../bom.service';
import { MatDialog } from '@angular/material/dialog';
import { BOMCreatePopUpComponent } from '../../bomcreate-pop-up/bomcreate-pop-up.component';

@Component({
  selector: 'app-bomspage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bomspage.component.html',
  styleUrl: './bomspage.component.css'
})
export class BomspageComponent {

  listOfBoms: Bom[] = [];

  constructor(private dialog: MatDialog ,private service:DefaultService, private router: Router, private bomService: BomService){

  }

  ngOnInit(){
    this.service.getAllBoms().subscribe(data => {
      this.listOfBoms = data;
      console.log(this.listOfBoms);
    })
  }

  redirectToBomDetails(index: number){
    this.bomService.changeBindingSocket(this.listOfBoms[index]._id ?? '');
    this.router.navigate(['/bomDetails']);
  }

  openAddBOMDialog(){
    const dialogRef = this.dialog.open(BOMCreatePopUpComponent, {
        width: '400px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.service.createCategory(result).subscribe(response => {
    //       console.log('Categorie adăugată cu succes:', response);
    //       this.listOfCategories.push(response);
    //     });
    //   }
    // });
  }
}
