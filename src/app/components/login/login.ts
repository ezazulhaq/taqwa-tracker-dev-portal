import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

  constructor() {
    // Redirect if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/docs']);
    }
  }

  onSubmit(): void {
    if (!this.email() || !this.password()) {
      return;
    }

    this.error.set('');
    this.loading.set(true);

    this.authService.login(this.email(), this.password()).subscribe({
      next: () => {
        this.router.navigate(['/docs']);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(error.error?.detail || 'Authentication failed. Please check your credentials.');
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
}