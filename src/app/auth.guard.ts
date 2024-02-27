import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean = false;
  constructor(private authService:AuthService, private router: Router, private toastr: ToastrService ) {}
  canActivate(): boolean {
    if (this.authService.isLoggedIn() || this.isLoggedInInLocalStorage()) {
      return true;
    } else {
      this.toastr.warning('Please login first');
      this.router.navigate(['/login']);
      return false;
    }
  }
  isLoggedInInLocalStorage(): boolean {
    const userDataString = localStorage.getItem('userData');
    return !!userDataString;
  }
}
