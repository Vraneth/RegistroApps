import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuarioNombre: string = ''; // Variable para mostrar el mensaje de bienvenida
  private apiUrlUsers = 'http://localhost:3000/users'; // URL de la colección `users`
  
  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {
    const user = this.authService.getUser(); // Obtiene el usuario desde el servicio
    if (user) {
      this.usuarioNombre = user.name; // Asigna el nombre del usuario
    }
    this.router.navigate(['home/reglamento-profesor']);
  }
    
  ngOnInit() {
    this.cargarProfesor(); // Cargar datos del alumno
    this.router.navigate(['home/reglamento-profesor']); // Redirección inicial
  }

  cargarProfesor() {
    const userId = this.authService.getUserId(); // Obtiene el ID del usuario autenticado
    if (userId) {
      // Solicita los datos de la colección `users`
      this.http.get<any[]>(this.apiUrlUsers).subscribe({
        next: (users) => {
          // Busca el usuario por ID y verifica que sea alumno
          const profesor = users.find(
            (user) => user.id === userId.toString() && user.ocupacion === 'Profesor'
          );
          if (profesor) {
            this.usuarioNombre = `${profesor.name}`; // Mensaje personalizado
          } else {
            this.usuarioNombre = 'Bienvenido, usuario desconocido.'; // Fallback si no es alumno
          }
        },
        error: (err) => {
          console.error('Error al cargar los datos del usuario:', err);
          this.usuarioNombre = 'Bienvenido, usuario desconocido.'; // Fallback en caso de error
        },
      });
    } else {
      console.error('No se encontró un userId válido.');
      this.usuarioNombre = 'Bienvenido, usuario desconocido.'; // Fallback si no hay userId
    }
  }

  segmentChanged($event: any){
    console.log($event.detail.value);
    let direction=$event.detail.value
    this.router.navigate(['home/'+direction])
  }

  logout() {
    this.authService.removeToken(); // Limpia la información de sesión
    this.router.navigate(['/login']); // Redirige al login
  }
  

}


