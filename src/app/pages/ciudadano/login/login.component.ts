import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent, 
  IonItem, IonLabel, 
  IonButton, IonInput
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
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
export class LoginComponent  implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {
    
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
          this.router.navigate(['/reportes-list'])
  }

  registrarse() {
    console.log('Navegando a registro...');
    this.router.navigate(['/register'])
  }
}
