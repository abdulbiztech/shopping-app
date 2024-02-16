import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService,private router:Router) { }

  userData: User = {
    name: '',
    email: '',
    password: '',
    confirmPassword:'',
    acceptTerms: false,
  };


  registerUser(registerForm: any) {
    if (registerForm.valid) {
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        // Password and confirmPassword don't match
        console.error('Passwords do not match');
        // Show error message or handle the error as needed
        return;
      }

      const userData: User = {
        id: registerForm.value.id ? +registerForm.value.id : undefined,
        name: registerForm.value.name,
        email: registerForm.value.email,
        password: registerForm.value.password,
        confirmPassword: registerForm.value.confirmPassword,
        acceptTerms: registerForm.value.acceptTerms,
      };

      this.authService.register(userData).subscribe(response => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
        // Handle successful registration, e.g., redirect to login page
      }, error => {
        console.error('Registration failed:', error);
        // Handle registration failure, e.g., display error message
      });
    } else {
      // Form validation failed, handle errors or display validation messages
    }
}
loginRedirect(){
  this.router.navigate(['/login'])
}
}
