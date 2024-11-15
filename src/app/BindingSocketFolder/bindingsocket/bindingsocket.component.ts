import { Component } from '@angular/core';
import { DefaultService } from '../../generated/api/default.service';
import { BindingSocket } from '../../generated/model/bindingSocket';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BindingSocketServiceService } from '../../binding-socket-service.service';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../categories.service';
import { Categories } from '../../generated/model/categories';
import { SubcategoriesService } from '../../subcategories.service';
import { Subcategories } from '../../generated/model/subcategories';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-bindingsocket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bindingsocket.component.html',
  styleUrl: './bindingsocket.component.css'
})
export class BindingsocketComponent {

  searchTerm: any;

  listOfBindingSockets:BindingSocket[] = [];

  keys:string[] = [];

  subcategory:string = ''

  constructor(private service:DefaultService, private router: Router, private bindingSocketService: BindingSocketServiceService, private sService: SubcategoriesService, private dialogRef: MatDialog){}

  ngOnInit() {

    const savedSubcategory = sessionStorage.getItem('subcategory');

    if (savedSubcategory) {
      this.subcategory = savedSubcategory;
    }

    this.sService.currentSubcategory.subscribe(data => {
      if (data) {
        this.subcategory = data;
        // Store the new subcategory in sessionStorage whenever it changes
        sessionStorage.setItem('subcategory', this.subcategory);
      }
    });

    this.service.getBindingSockets(this.subcategory).subscribe(data => {
      console.log("test",this.subcategory)
      this.listOfBindingSockets = data;
      this.extractKeys();
    })
  }

  filterList() {
    this.service.getBindingSocketsForSearch(this.searchTerm,this.subcategory).subscribe(data =>{
      this.listOfBindingSockets = data;
    })
  }

  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  extractKeys(): void {
    const keysSet: Set<string> = new Set();

    this.listOfBindingSockets.forEach(bindingSocket => {
      Object.keys(bindingSocket).forEach(key => {
        if (key == "_id" || key == "subcategory" || key=="pricemin"){
          return;
        }
        if(key == "producer")
          key = "supplier";
        keysSet.add(key.toUpperCase());
      });
    });

    this.keys = Array.from(keysSet);
  }
  
  redirectToCreateBindingSocket() {
    this.router.navigate(['/createBindingSocket']);
  }

  deleteSocket(id: string) {
    //request sa stergem si din database
    this.service.deleteBindingSocket(id)
    .subscribe(
      () => {
        console.log('Binding Socket deleted successfully.');
      },
      (error) => {
        console.error('Error deleting Binding Socket:', error);
      }
    );
  }

  openDialog(index: number, event: Event){
    this.bindingSocketService.changeBindingSocket(this.listOfBindingSockets[index]);
    this.dialogRef.open(PopUpComponent);
  }

  editBindingSocket(index: number) {
    this.bindingSocketService.changeBindingSocket(this.listOfBindingSockets[index]);
    this.router.navigate(['/editBindingSocket']);
  }

  redirectToSubcategries() {
    this.router.navigate(['/subcategories']);
  }
  
  addToBom(socketID: string) {
    this.service.addBOM(socketID).subscribe(
      () => {
        console.log('Binding Socket added to BOM.');
      },
      (error: any) => {
        console.error('Error adding to BOM:', error);
      }
    );
  }
}
