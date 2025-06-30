import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  imagePath:string = 'assets/BOM.png'

  constructor(private router:Router){}

  redirectToSupplierContacts() {
    this.router.navigate(['/Contact'])
  }
  redirectToHome() {
    this.router.navigate(['categories'])
  }
  redirectToBoms(){
    this.router.navigate(['boms'])
  }
}
