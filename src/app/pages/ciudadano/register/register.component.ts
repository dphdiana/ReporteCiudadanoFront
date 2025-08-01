import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonSelectOption,
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
// Define el tipo para tipo_usuario
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
    RouterModule,
    
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nombre = '';
  correo = '';
  password = '';
  tipo_usuario: UserType = 'ciudadano'; // Valor por defecto
  loading = false;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}
  ngOnInit(): void {

  }
  async registrar() {
    if (!this.nombre || !this.correo || !this.password) {
      await this.presentToast('Todos los campos son obligatorios.');
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
      next: async () => {
        await this.presentToast('¡Registro exitoso!');
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        const errorMessage = err.error?.message || 'Error en el registro';
        await this.presentToast(`Error: ${errorMessage}`);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}