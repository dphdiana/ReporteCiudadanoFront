import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem,IonLabel,IonImg,IonSelectOption,IonButton, IonList} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';


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

  constructor(private formBuilder: FormBuilder) {
    this.reporteForm = this.formBuilder.group({
        nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      tipo: ['queja', Validators.required],
      descripcion: ['', Validators.required],
    });
    
  }

    onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  enviarReporte() {
    if (this.reporteForm.invalid) {
      this.reporteForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.reporteForm.value.nombre);
    formData.append('apellidos', this.reporteForm.value.apellidos);
    formData.append('correo', this.reporteForm.value.correo);
    formData.append('telefono', this.reporteForm.value.telefono);
    formData.append('tipo', this.reporteForm.value.tipo);
    formData.append('descripcion', this.reporteForm.value.descripcion);

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    // Aquí harías la petición HTTP al backend
    console.log('Formulario listo para enviar:', formData);
  }

  ngOnInit() {
  }

}
