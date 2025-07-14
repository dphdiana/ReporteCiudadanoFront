import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAccordion } from '@ionic/angular/standalone';
import { IonAlert, IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.page.html',
  styleUrls: ['./admin-reportes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AdminReportesPage implements OnInit {
  alertButtons = ['Action'];

  constructor() { }

  ngOnInit() {
  }

}
