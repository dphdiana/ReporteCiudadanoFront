import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent, 
  IonItem, IonLabel, 
  IonButton, IonInput,IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';



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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    FormsModule,
  
    RouterModule,
    ReactiveFormsModule,
    
    
]
})
export class LoginComponent  implements OnInit {
   correo = '';
  password = '';
  constructor(private authService: AuthService
              , private router: Router, private alertController: AlertController
  ) {}
  ngOnInit(): void {

  }
onLogin() {
  this.authService.login(this.correo, this.password).subscribe({
    next: (response: any) => {
      console.log('Login exitoso');

      // GUARDAR EL TOKEN
      localStorage.setItem('token', response.token); // <- GUÁRDALO AQUÍ

      this.router.navigate(['/formulario-reporte']);
    },
    error: (err) => {
      console.error('Error de login', err);
      alert('Credenciales incorrectas o error del servidor');
    }
  });
}
}