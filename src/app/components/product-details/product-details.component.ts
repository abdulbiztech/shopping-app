import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';// Import your CartService or use HttpClient directly

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: any;
  quantity: number = 1;
  isItemInCart: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private productService: ProductService,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}
  currentUser = {
    id: 'edbe',
  };

  products = {
    id: '7b47',
  };

  ngOnInit(): void {
    const productId = this.router.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: any) => {
        this.product = data;
      });
    }
  }
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  addToCart(userId: string, productId: string): void {
    this.productService.getProductById(productId).subscribe((productDetails: any) => {
      this.productService.getCartData().subscribe((cartItems: any[]) => {
        const existingCartItem = cartItems.find(item => item.userId === userId && item.productId === productId);
        if (existingCartItem) {

          existingCartItem.quantity += this.quantity;
          this.toastr.success('Item quantity updated in cart!');
        } else {
          const cartItem = {
            userId,
            productId,
            quantity: this.quantity,
            name: productDetails.name,
            description: productDetails.description,
            price: productDetails.price,
            image: productDetails.img
          };
          this.http.post<any>('http://localhost:3000/cart', cartItem).subscribe(
            response => {
              this.toastr.success('Item added to cart!');
              this.route.navigate(['/cart']);
            },
            error => {
              console.error('Error adding item to cart:', error);
            }
          );
        }
      });
    });
  }


}
