import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";

@Component({
  selector: 'app-reportes-list',
  templateUrl: './reportes-list.component.html',
  styleUrls: ['./reportes-list.component.scss'],
  imports: [IonCol, IonRow, IonGrid, 
    
  ]
})
export class ReportesListComponent  implements OnInit {

data = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    // Puedes agregar más elementos aquí
  ];
  constructor() { }

  ngOnInit() {}

}
