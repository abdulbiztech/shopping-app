import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/services/cart.interface';
import { CartTotals } from 'src/app/services/cartTotal.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  images: any[] = [];
  products: any[] = [];
  totalPricee:any
  constructor(private productService: ProductService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchCartData();
  }


  findProductById(productId: string): any {
    return this.products.find(product => product.id === productId);
  }


  fetchCartData(): void {
    this.productService.fetchCartDataWithProductDetails().subscribe(
      (response: any[]) => {
        this.images = response;
        let totalPrice = 0;
        for (const product of response) {
          totalPrice += parseFloat(product.price);
        }
        this.totalPricee = totalPrice.toFixed(2);
        console.log("this.totalPricee", this.totalPricee);
        this.calculateCartTotals();
      },
      error => {
        console.error('Error fetching cart data:', error);
      }
    );
  }
  removeFromCart(productId: string): void {
    this.productService.removeFromCart(productId).subscribe(
      () => {
        this.images = this.images.filter(cartItem => cartItem.id !== productId);
        this.toastr.info('Item removed successfully!');
        this.calculateCartTotals();
      },
      error => {
        console.error('Error removing item from cart:', error);
      }
    );
  }
  cartTotals: CartTotals = { subtotal: 0, tax: 0, shipping: 0, total: 0 };

  calculateCartTotals(): void {
    const subtotal = this.images.reduce((acc, item) => acc + parseFloat(item.price), 0);
    const tax = (subtotal * 0.1); // Assuming tax rate is 10%
    const shipping = 10; // Example shipping cost
    const total =  (subtotal + tax + shipping).toFixed(0);
    console.log("total", total);

    this.cartTotals = { subtotal, tax, shipping, total };
  }


}
