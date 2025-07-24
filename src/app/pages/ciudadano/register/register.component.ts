import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonImg, IonSelectOption,
  IonButton, IonList, IonInput, IonSelect,
  IonTextarea
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
    imports: [
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
]
})
export class RegisterComponent  implements OnInit {

nombre: string = '';
  email: string = '';
  usuario: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async registrarse() {
    // Validar campos vacíos
    if (!this.nombre || !this.email || !this.usuario || !this.contrasena || !this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingrese un email válido',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar contraseñas coincidan
    if (this.contrasena !== this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar longitud de contraseña
    if (this.contrasena.length < 6) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe tener al menos 6 caracteres',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Aquí puedes agregar tu lógica de registro
    console.log('Datos de registro:', {
      nombre: this.nombre,
      email: this.email,
      usuario: this.usuario,
      contrasena: this.contrasena
    });

    // Simulación de registro exitoso
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Registro completado exitosamente',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.nombre = '';
    this.email = '';
    this.usuario = '';
    this.contrasena = '';
    this.confirmarContrasena = '';
  }

}
