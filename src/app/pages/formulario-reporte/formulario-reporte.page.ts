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
import { RouterModule } from '@angular/router';
import { ReporteService } from 'src/app/services/reporte.service'; // ajusta la ruta según tu estructura

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
  private reporteService = inject(ReporteService);

  reporteForm!: FormGroup;
  selectedImage: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;

  ngOnInit() {
    this.reporteForm = this.fb.group({
      titulo: ['', Validators.required],
      categoria: ['vial', Validators.required],
      descripcion: ['', Validators.required]
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

        // Convertir la imagen a Blob
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
    formData.append('titulo', this.reporteForm.get('titulo')?.value);
    formData.append('categoria', this.reporteForm.get('categoria')?.value);
    formData.append('descripcion', this.reporteForm.get('descripcion')?.value);

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    const token = localStorage.getItem('token') ?? '';

    this.reporteService.enviarReporte(formData).subscribe({
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
