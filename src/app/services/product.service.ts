import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, catchError } from 'rxjs';
import {  mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000'; //my json api
  cartItemRemoved: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`);
  }

  getCartData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  }

  getProductDetails(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`);
  }

  fetchCartDataWithProductDetails(): Observable<any[]> {
    return this.getCartData().pipe(
      mergeMap((cartItems) =>
        forkJoin(
          cartItems.map((cartItem) =>
            this.getProductDetails(cartItem.productId).pipe(
              map((product) => ({ ...product, id: cartItem.id })),
              catchError((error) => {
                console.error('Error fetching product details:', error);
                return [];
              })
            )
          )
        )
      ),
      catchError((error) => {
        console.error('Error fetching cart data:', error);
        return [];
      })
    );
  }

  updateCartData(cartItems: any[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cart`, cartItems);
  }

  removeFromCart(cartItemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${cartItemId}`).pipe(
      tap(() => {
        this.cartItemRemoved.emit();
      }),
      catchError((error) => {
        console.error('Error removing item from cart:', error);
        return [];
      })
    );
  }
  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart`).pipe(
      tap(() => {
        this.cartItemRemoved.emit();
      })
    );
  }

  // getAllPayments(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/payments`);
  // }
}
