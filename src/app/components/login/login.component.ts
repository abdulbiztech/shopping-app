import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.interface';

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
    private router: Router
  ) {}

  loginUser() {
    // Checking if the form is valid
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

          // Save user email and password in local storage
          localStorage.setItem('userEmail', this.email);
          localStorage.setItem('userPassword', this.password);

          this.router.navigate(['/products']);
        } else {
          console.error('Invalid password.');
        }
      } else {
        console.error('User not found.');
      }
    }, error => {
      console.error('Error authenticating user:', error);
    });
  }

  registerRedirect() {
    this.router.navigate(['/register']);
  }
}
