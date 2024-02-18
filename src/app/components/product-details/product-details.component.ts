import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: any;
  quantity: number = 1;
  constructor(private router: ActivatedRoute,private route: Router , private productService: ProductService,private http: HttpClient,private toastr: ToastrService) {}
  ngOnInit(): void {
    const productId = this.router.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: any) => {
        this.product = data;
      });
    }
  }

  currentUser = {
    id: 'edbe',
  };

  products = {
    id: '7b47',
  };

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }


  addToCart(userId: string, productId: string): void {
    const cartItem = { userId, productId ,quantity: this.quantity };

    this.http.post<any>('http://localhost:3000/cart', cartItem).subscribe(
      response => {
        console.log('Item added to cart:', response);
        this.toastr.success('Item added to cart!');
        this.route.navigate(['/cart']);
      },
      error => {
        console.error('Error adding item to cart:', error);
      }
    );
  }


}
