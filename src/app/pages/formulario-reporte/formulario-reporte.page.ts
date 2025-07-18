import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonImg, IonSelectOption,
  IonButton, IonList, IonInput, IonSelect,
  IonTextarea,IonText
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-formulario-reporte',
  templateUrl: './formulario-reporte.page.html',
  styleUrls: ['./formulario-reporte.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Ionic Components
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonImg, IonSelectOption,
    IonButton, IonList, IonInput, IonSelect,
    IonTextarea,IonText
  ]
})
export class FormularioReportePage implements OnInit {
  reporteForm!: FormGroup;
  selectedImage: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
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

  async tomarFoto(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        this.selectedImage = image.dataUrl;
        const blob = await (await fetch(image.dataUrl)).blob();
        this.selectedFile = new File([blob], `foto_${Date.now()}.jpg`, { type: blob.type });
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      // Manejo de errores
    }
  }

  enviarReporte(): void {
    if (this.reporteForm.invalid) {
      this.reporteForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formData = this.prepareFormData();
    
    console.log('Datos a enviar:', formData);
    // Aquí iría tu llamada HTTP
    // .finally(() => this.isSubmitting = false);
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.reporteForm.value).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    return formData;
  }

  campoInvalido(campo: string): boolean {
  const control = this.reporteForm.get(campo);
  return !!(control && control.invalid && (control.dirty || control.touched));
}
}