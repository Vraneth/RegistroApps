import { Component } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';  // Importa ModalController
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
})
export class RecuperarContrasenaComponent {
  email: string = '';

  constructor(
    private toastController: ToastController, 
    private router: Router, 
    private modalController: ModalController,
    private navController: NavController
  ) {}

  // Método para mostrar el mensaje de recuperación
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000,
      position: 'bottom',
      color: 'success',
      buttons: [
        {
          side: 'end',
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Toast cerrado');
          }
        }
      ]
    });
    toast.present();
  }

  // Método para recuperar la contraseña
  async recuperarContrasena() {
    if (this.email.endsWith('@profesor.duocuc.cl') || this.email.endsWith('@duocuc.cl')){
      // Muestra el toast con el mensaje de éxito
      this.mostrarToast('Se ha enviado correctamente el correo para recuperar tu contraseña');
      
      // Cierra el modal (si estás usando un modal) y navega al login
      setTimeout(() => {
        this.modalController.dismiss();  // Cierra el modal
        this.router.navigate(['/login']);  // Navega a la página de login
      }, 1000);  // Espera 3 segundos antes de redirigir
    } else {
      // Muestra el toast con el mensaje de error
      this.mostrarToast('Ingrese un correo electrónico válido');
    }
  }

  regresarALogin() {
    this.modalController.dismiss().then(() => {
      console.log('Modal cerrado, redirigiendo a login...');
      this.router.navigate(['/login']);
    });
  }
  
}
