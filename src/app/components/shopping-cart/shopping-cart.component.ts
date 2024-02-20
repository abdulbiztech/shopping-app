import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CartTotals } from "src/app/services/cartTotal.interface";
import { ProductService } from "src/app/services/product.service";
import { Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
declare var Razorpay: any;

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent {
  razorpay: any;
  images: any[] = [];
  products: any[] = [];
  productId: any;
  totalPricee: any;
  orderId: any;
  paymentId: any;
  signature: any;
  finalpirce: any;
  @Output() cartItemRemoved: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.razorpay = new Razorpay({
      key: "rzp_test_xLCW1I4G9opoDk",
      currency: "INR",
      image:
        "https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcnRvb258ZW58MHx8MHx8fDA%3D",
      handler: this.paymentHandler.bind(this),
    });
  }

  ngOnInit(): void {
    this.fetchCartData();
  }

  findProductById(productId: string): any {
    return this.products.find((product) => product.id === productId);
  }

  fetchCartData(): void {
    this.productService.getCartData().subscribe(
      (response: any[]) => {
        this.images = response;

        let totalPrice = 0;
        for (const product of response) {
          totalPrice += parseFloat(product.price);
          this.productId = product.productId;
        }
        this.totalPricee = totalPrice.toFixed(2);
        this.calculateCartTotals();
      },
      (error) => {
        console.error("Error fetching cart data:", error);
      }
    );
  }

  removeFromCart(productId: string): void {
    this.productService.removeFromCart(productId).subscribe(
      () => {
        this.images = this.images.filter(
          (cartItem) => cartItem.id !== productId
        );
        this.toastr.info("Item removed successfully!");
        this.calculateCartTotals();
        this.cartItemRemoved.emit();
      },
      (error) => {
        console.error("Error removing item from cart:", error);
      }
    );
  }
  cartTotals: CartTotals = { subtotal: 0, tax: 0, shipping: 0, total: 0 };

  calculateCartTotals(): void {
    let subtotal = 0;
    let totalQuantity = 0;
    for (const item of this.images) {
      subtotal += parseFloat(item.price) * item.quantity;
      totalQuantity += item.quantity;
    }
    const tax = subtotal * 0.1;
    const shipping = 10;
    const total = (subtotal + tax + shipping).toFixed(0);
    this.finalpirce = total;

    this.cartTotals = { subtotal, tax, shipping, total };
  }
  calculateTotalAmount(): number {
    let totalAmount = 0;
    this.images.forEach((item) => {
      totalAmount += parseFloat(item.price) * item.quantity;
    });
    return totalAmount;
  }
  initializePayment(orderId: string): void {
    const options = {
      key: "rzp_test_xLCW1I4G9opoDk",
      amount: this.finalpirce * 100,
      currency: "INR",
      prefill: {
        name: "Test",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },

      handler: (response: any) => {
        console.log("Payment response:", response);
        this.toastr.success("Order placed successfully!");
        this.router.navigate(["/thankyou"]);
        this.paymentId = response.razorpay_payment_id;
        this.orderId = response.razorpay_order_id;
        this.signature = response.razorpay_signature;
      },
    };

    const razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }
  paymentHandler(response: any): void {
    if (response && response.razorpay_payment_id) {
      this.toastr.success("Order placed successfully!");
      this.router.navigate(["/thankyou"]);
    } else {
      this.toastr.error("Payment failed or cancelled.");
    }
  }

  Order() {
    this.initializePayment(this.productId);
  }
}
