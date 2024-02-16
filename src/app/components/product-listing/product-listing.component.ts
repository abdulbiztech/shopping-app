import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService,private router:Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.slice(0, 10); // Assuming you want to display only the first 10 products
    });
  }

  prdocutDetail(){
    this.router.navigate(['/product-details']);
  }

}
