import { Component, inject } from '@angular/core';
import { 
  IonApp, IonRouterOutlet, IonMenu, IonContent,
  IonList, IonItem, IonLabel, IonMenuToggle,
  IonHeader, IonToolbar, IonTitle, IonButtons,
  IonMenuButton, IonIcon, IonBadge, IonButton,
  IonAvatar
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuController } from '@ionic/angular/standalone'; // Cambiado a standalone
import { addIcons } from 'ionicons';
import { 
  close, documentText, folderOpen,
  settings, helpCircle, logOut
} from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    // Componentes Ionic
    IonApp, IonRouterOutlet, IonMenu, IonContent,
    IonList, IonItem, IonLabel, IonMenuToggle,
    IonHeader, IonToolbar, IonTitle, IonButtons,
    IonMenuButton, IonIcon, IonBadge, IonButton,
    IonAvatar,CommonModule,RouterModule
  ]
})
export class AppComponent {
  private menuCtrl = inject(MenuController);

  constructor() {
    addIcons({ 
      close, documentText, folderOpen,
      settings, helpCircle, logOut 
    });
  }

  async closeMenu() {
    await this.menuCtrl.close();
  }
}