import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem,IonLabel,IonImg,IonSelectOption,IonButton, IonList} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-formulario-reporte',
  templateUrl: './formulario-reporte.page.html',
  styleUrls: ['./formulario-reporte.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
           IonItem, IonLabel, IonImg, IonSelectOption, IonButton, ReactiveFormsModule, IonList]

})
export class FormularioReportePage implements OnInit {
  reporteForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.reporteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      tipo: ['queja', Validators.required],
      categoria: ['vial', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    if (image.dataUrl) {
      this.selectedImage = image.dataUrl;

      const blob = await fetch(image.dataUrl).then(res => res.blob());
      this.selectedFile = new File([blob], 'foto.jpg', { type: blob.type });
    }
  }

  enviarReporte() {
    if (this.reporteForm.invalid || !this.selectedFile) {
      this.reporteForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const datos = this.reporteForm.value;

    for (const campo in datos) {
      formData.append(campo, datos[campo]);
    }

    formData.append('foto', this.selectedFile);

    console.log('Formulario listo para enviar:', formData);
    // Aquí va tu llamada HTTP
  }
  ngOnInit() {
    // Inicialización adicional si es necesario
  }
}