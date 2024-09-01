import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required]
    });
  }

  register() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.registerForm.valid) {
      const { correo, clave, nombre } = this.registerForm.value;
      this.authService.register(correo, clave, nombre).subscribe(
        response => {
          this.successMessage = 'Registration successful!';
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
