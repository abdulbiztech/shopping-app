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
  filteredProducts: any[] = [];
  searchTerm: string = '';
  priceFilter: string = '';
  constructor(private productService: ProductService,private router:Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  prdocutDetail(productId:any){
    this.router.navigate(['/product-details',productId]);
  }
  filterProducts() {
    const searchTerm = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = [];
    if (searchTerm === '') {
      this.filteredProducts = this.products;
      this.filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      this.filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }
  }
  sortProductsByPriceAsc() {
    this.filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } //price (low to high)

  sortProductsByPriceDesc() {//price (high to low)
    this.filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }
}
