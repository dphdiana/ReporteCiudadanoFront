// register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

type UserType = 'ciudadano' | 'empresa';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSpinner,
    IonSelect,
    IonSelectOption,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nombre = '';
  correo = '';
  password = '';
  tipo_usuario: UserType = 'ciudadano';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(form: NgForm) {
    if (form.invalid) {
      // Si el formulario no es válido, marca todos los campos como tocados para mostrar errores
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.loading = true;

    const registerData = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      tipo_usuario: this.tipo_usuario
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        // Aquí podrías mostrar un mensaje de error más visual si quieres
        console.error('Error al registrar:', err);
      }
    });
  }
}
