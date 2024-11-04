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

  imagePath:string = 'assets/PngItem_411992.png'

  constructor(private router:Router){}

  redirectToLogIn() {
    this.router.navigate(['/login'])
  }
  redirectToHome() {
    this.router.navigate([''])
  }
  redirectToBoms(){
    this.router.navigate(['boms'])
  }
}
