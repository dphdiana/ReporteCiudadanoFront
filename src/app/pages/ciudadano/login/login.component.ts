import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonImg, IonSelectOption,
  IonButton, IonList, IonInput, IonSelect,
  IonTextarea
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule
  ]
})
export class LoginComponent  implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async ingresar() {
    if (!this.usuario || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Aquí puedes agregar tu lógica de autenticación
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.contrasena);
    
    // Simulación de login exitoso
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Inicio de sesión exitoso',
      buttons: ['OK']
    });
    await alert.present();
  }

  registrarse() {
    // Navegar a página de registro
    console.log('Navegando a registro...');
    // this.router.navigate(['/register']);
  }
}
