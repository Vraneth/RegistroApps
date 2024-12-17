import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';  // Ruta corregida a 'auth/auth.service'

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrls: ['./codigoqr.component.scss'],
})
export class CodigoqrComponent implements OnInit {
  idClase: string = '11'; // Este ID debe ser dinámico, provenir de la clase seleccionada
  alumnoId: string | null = null;  // Este ID se obtiene dinámicamente del usuario autenticado

  qrValue: string = '';
  showQr: boolean = false;  // Variable para controlar la visibilidad del QR

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener el ID del alumno autenticado desde el AuthService
    this.alumnoId = this.authService.getUserId()?.toString() || null;

    if (this.alumnoId) {
      // Generar la URL para el código QR con los parámetros dinámicos
      this.qrValue = `http://localhost:8100/home-alumno/registrar-asistencia?idClase=${this.idClase}&alumnoId=${this.alumnoId}`;
    }
  }

  // Método que cambia la visibilidad del código QR
  mostrarQr() {
    this.showQr = !this.showQr;  // Alterna el valor de showQr (true/false)
  }
}




