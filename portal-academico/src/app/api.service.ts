import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://IP_API:5000';

  constructor(private http: HttpClient) {}

  guardarEstudiante(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/estudiantes`, data);
  }

  listarEstudiantes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiantes`);
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, data);
  }

  subirArchivo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/multimedia`, formData);
  }

  listarArchivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/multimedia`);
  }

  obtenerMetadatos(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/multimedia/${id}`);
  }
}
