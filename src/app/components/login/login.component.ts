import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginUser() {
    if (!this.email || !this.password) {
      console.error('Email and password are required.');
      return;
    }

    this.authService.getUserByEmailAndPassword(this.email, this.password).subscribe((users: User[]) => {
      if (users.length > 0) {
        const user = users[0];
        // Checking if password matches
        if (user.password === this.password) {
          console.log('Login successful.');
          this.toastr.success('Login successful!');
          const userData = {
            userEmail: this.email,
            userPassword: this.password
          };
          localStorage.setItem('userData', JSON.stringify(userData));

          this.router.navigate(['/products']);
        } else {
          console.error('Invalid password.');
        this.toastr.error('Registration failed!');

        }
      } else {
        console.error('User not found.');
        this.toastr.error('User not found!');

      }
    }, error => {
      console.error('Error authenticating user:', error);
      this.toastr.error('Error authenticating user!');

    });
  }

  registerRedirect() {
    this.router.navigate(['/register']);
  }
}
