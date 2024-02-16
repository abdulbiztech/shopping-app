import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  constructor(private productService: ProductService,private router:Router) {
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');
    if (userEmail && userPassword) {
      this.isLoggedIn = true;
    }
  }
  loginRedirect(){
    this.router.navigate(['/login']);
  }
  signinRedirect(){
    this.router.navigate(['/register']);
  }
}
