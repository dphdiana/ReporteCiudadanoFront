import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonImg, IonSelectOption,
  IonButton, IonList, IonInput, IonSelect,
  IonTextarea, IonText
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-reporte',
  templateUrl: './formulario-reporte.page.html',
  styleUrls: ['./formulario-reporte.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonImg, IonSelectOption,
    IonButton, IonList, IonInput, IonSelect,
    IonTextarea, IonText, RouterModule
  ]
})
export class FormularioReportePage implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  reporteForm!: FormGroup;
  selectedImage: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;

  ngOnInit() {
    this.reporteForm = this.fb.group({
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

        // Convertir la imagen a blob
        const blob = await (await fetch(image.dataUrl)).blob();
        this.selectedFile = new File([blob], `foto_${Date.now()}.jpg`, {
          type: blob.type,
        });
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }

  enviarReporte(): void {
    if (this.reporteForm.invalid) {
      this.reporteForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('categoria', this.reporteForm.get('categoria')?.value);
    formData.append('descripcion', this.reporteForm.get('descripcion')?.value);

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    const token = localStorage.getItem('token'); // token guardado después del login

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      // No pongas 'Content-Type' si usas FormData. Angular lo gestiona automáticamente.
    });

    this.http.post('http://localhost:8000/api/reportes', formData, { headers })
      .subscribe({
        next: (res) => {
          console.log('Reporte enviado correctamente', res);
          this.reporteForm.reset();
          this.selectedImage = null;
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error al enviar el reporte', err);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  campoInvalido(campo: string): boolean {
    const control = this.reporteForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
