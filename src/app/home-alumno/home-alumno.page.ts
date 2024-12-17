import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service'; 

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {
  usuarioNombre: string = ''; // Variable para mostrar el mensaje de bienvenida
  private apiUrlUsers = 'http://localhost:3000/users'; // URL de la colección `users`

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarAlumno(); // Cargar datos del alumno
    this.router.navigate(['home-alumno/historial-asistencia']); // Redirección inicial
  }

  cargarAlumno() {
    const userId = this.authService.getUserId(); // Obtiene el ID del usuario autenticado
    if (userId) {
      // Solicita los datos de la colección `users`
      this.http.get<any[]>(this.apiUrlUsers).subscribe({
        next: (users) => {
          // Busca el usuario por ID y verifica que sea alumno
          const alumno = users.find(
            (user) => user.id === userId.toString() && user.ocupacion === 'Alumno'
          );
          if (alumno) {
            this.usuarioNombre = `Hola Alumno ${alumno.name}`; // Mensaje personalizado
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
    this.router.navigate(['home-alumno/'+direction])
  }

  logout() {
    this.authService.removeToken(); // Limpia la información de sesión
    this.router.navigate(['/login']); // Redirige al login
  }

}