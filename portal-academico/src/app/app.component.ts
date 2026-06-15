import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styles: [`
    h2 { color: #333; }
    input { margin-bottom: 10px; display: block; }
  `]
})
export class AppComponent {
  estudiante = { nombre: '', carrera: '' };
  usuario = { username: '', password: '' };
  archivoSeleccionado: File | null = null;
  recursoId: string = '';

  resEstudiantes: any;
  resUsuarios: any;
  resMultimedia: any;

  constructor(private apiService: ApiService) {}

  guardarEstudiante() {
    this.apiService.guardarEstudiante(this.estudiante).subscribe(res => this.resEstudiantes = res);
  }

  listarEstudiantes() {
    this.apiService.listarEstudiantes().subscribe(res => this.resEstudiantes = res);
  }

  registrarUsuario() {
    this.apiService.registrarUsuario(this.usuario).subscribe(res => this.resUsuarios = res);
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirArchivo() {
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append('archivo', this.archivoSeleccionado);
      this.apiService.subirArchivo(formData).subscribe(res => this.resMultimedia = res);
    }
  }

  listarArchivos() {
    this.apiService.listarArchivos().subscribe(res => this.resMultimedia = res);
  }

  obtenerMetadatos() {
    this.apiService.obtenerMetadatos(this.recursoId).subscribe(res => this.resMultimedia = res);
  }
}
