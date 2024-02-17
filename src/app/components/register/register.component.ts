import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService,private router:Router,private toastr: ToastrService) { }

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
        console.error('Passwords do not match');
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
        this.toastr.success('Registration successful!');
        this.router.navigate(['/login']);
      }, error => {
        console.error('Registration failed:', error);
        this.toastr.error('Registration failed!');

      });
    } else {
    }
}
loginRedirect(){
  this.router.navigate(['/login'])
}
}
