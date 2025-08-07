import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSpinner
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSpinner
  ],
})
export class LoginComponent implements OnInit {
  correo = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.loading = true;

    this.authService.login(this.correo, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/formulario-reporte']);
      },
      error: () => {
        this.loading = false;
        // Aquí podrías manejar el error visualmente si deseas
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
