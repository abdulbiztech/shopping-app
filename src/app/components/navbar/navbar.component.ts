import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItemCount: any   = 0;
  isLoggedIn: boolean = false;

  constructor(private productService: ProductService, private router: Router, private http: HttpClient) {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.fetchCartItemCount();
  }

  loginRedirect(): void {
    this.router.navigate(['/login']);
  }

  signinRedirect(): void {
    this.router.navigate(['/register']);
  }

  cartRedirect(): void {
    this.router.navigate(['/cart']);
  }

  fetchCartItemCount(): void {
    this.productService.getCartData().subscribe(
      count => {
        this.cartItemCount = count.length;
        console.log("this.cartItemCount.length",this.cartItemCount);

      },
      error => {
        console.error('Error fetching cart items count:', error);
      }
    );
  }
}
