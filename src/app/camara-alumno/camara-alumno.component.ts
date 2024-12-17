import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR from 'jsqr';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camara-alumno',
  templateUrl: './camara-alumno.component.html',
  styleUrls: ['./camara-alumno.component.scss'],
})
export class CamaraAlumnoComponent {
  scannedResult: string | null = null;
  imageDataUrl: string | null = null;
  private apiUrlHistorialAlumno = 'http://localhost:3000/historialAlumno'; // Endpoint de backend para registrar asistencia
  videoElement: HTMLVideoElement | null = null;  // Video element for camera stream
  canvasElement: HTMLCanvasElement | null = null; // Canvas for drawing the video
  context: CanvasRenderingContext2D | null = null; // Context for drawing on canvas

  constructor(private alertController: AlertController, private router: Router, private http: HttpClient) {}

  // Llamar esta función al iniciar la cámara
  startScanning() {
    // Asegúrate de que la cámara se inicialice correctamente
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement = document.createElement('video');
        this.videoElement.srcObject = stream as MediaStream;  // Aseguramos que srcObject sea un MediaStream
        this.videoElement.play();
        this.canvasElement = document.createElement('canvas');
        this.context = this.canvasElement.getContext('2d');
        
        // Llamar a la función que lee la cámara continuamente
        this.scanQRCode();
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
      });
  }

  // Función para escanear QR de forma continua
  scanQRCode() {
    if (this.videoElement && this.context && this.canvasElement) {
      this.context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.context.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      const code = jsQR(imageData.data, this.canvasElement.width, this.canvasElement.height);

      if (code) {
        this.scannedResult = code.data;
        const stream = this.videoElement.srcObject as MediaStream;  // Convertimos srcObject a MediaStream
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());  // Detener la cámara al escanear el QR
        this.registrarAsistencia(code.data); // Llamar a la función para registrar la asistencia
        this.showAlert('Escaneo exitoso', code.data);  // Mostrar el resultado del escaneo
      } else {
        requestAnimationFrame(() => this.scanQRCode()); // Continuar el escaneo
      }
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  registrarAsistencia(codigoQR: string) {
    // Aquí debes enviar los datos a tu backend. Supondré que el código QR contiene un ID de clase.
    const asistencia = {
      codigoClase: codigoQR, // Esto debe coincidir con el formato del código QR
      alumnoId: 123, // Asume que tienes el ID del alumno disponible
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    };

    this.http.post(this.apiUrlHistorialAlumno, asistencia).subscribe({
      next: (response) => {
        console.log('Asistencia registrada:', response);
      },
      error: (error) => {
        console.error('Error al registrar asistencia:', error);
      }
    });
  }

  regresarALogin() {
    this.router.navigate(['/login']);
  }
}



