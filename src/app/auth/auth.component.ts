import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoginMode = true;

  email = '';
  username = '';
  password = '';
  age: number | null = null;

  toggleForm() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.isLoginMode) {
      if (!this.email || !this.password || !this.username || !this.age) {
        console.log('fill everything');
        return;
      }
      this.authService
        .signup(this.email, this.password, this.age, this.username)
        .subscribe({
          next: () => {
            this.router.navigate(['/templates']);
          },
          error: (error) => {
            console.log('registration failed', error);
          },
        });
    } else {
      const signin = this.username || this.email;
      this.authService.signin(signin, this.password).subscribe({
        next: () => {
          this.router.navigate(['/templates']);
        },
        error: (error) => {
          console.log('signin failed', error);
        },
      });
    }
  }
}
