import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/services/cart.interface';
import { CartTotals } from 'src/app/services/cartTotal.interface';
import { ProductService } from 'src/app/services/product.service';
import { Output, EventEmitter } from '@angular/core';
declare var Razorpay: any;


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  razorpay: any;
  images: any[] = [];
  products: any[] = [];
  totalPricee:any
  @Output() cartItemRemoved: EventEmitter<void> = new EventEmitter<void>();
  constructor(private productService: ProductService,private toastr: ToastrService) {
    this.razorpay = new Razorpay({
      key: 'rzp_test_xLCW1I4G9opoDk',
      currency: 'INR',
      image: 'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcnRvb258ZW58MHx8MHx8fDA%3D',
      handler: this.paymentHandler.bind(this)
    });
  }

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
        this.cartItemRemoved.emit();
      },
      error => {
        console.error('Error removing item from cart:', error);
      }
    );
  }
  cartTotals: CartTotals = { subtotal: 0, tax: 0, shipping: 0, total: 0 };

  calculateCartTotals(): void {
    const subtotal = this.images.reduce((acc, item) => acc + parseFloat(item.price), 0);
    const tax = (subtotal * 0.1);
    const shipping = 10;
    const total =  (subtotal + tax + shipping).toFixed(0);
    console.log("total", total);

    this.cartTotals = { subtotal, tax, shipping, total };
  }

  initiatePayment(amount: number): void {
    const options = {
      amount: amount * 100, // Amount should be in paisa
      currency: 'INR',
      receipt: 'receipt_order_123'
    };

    this.razorpay.open(options);
  }

  paymentHandler(response: any): void {
    console.log(response);
    // Handle the response from Razorpay
  }
}
