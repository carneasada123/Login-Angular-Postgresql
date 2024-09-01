import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  clave: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Correo:', this.correo, 'Clave:', this.clave);
    this.authService.login(this.correo, this.clave).subscribe(
      response => {
        console.log('Login successful:', response);
        this.successMessage = 'Login successful!';
        this.authService.setUser(response.user);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your email and password.';
      }
    );
  }
}
