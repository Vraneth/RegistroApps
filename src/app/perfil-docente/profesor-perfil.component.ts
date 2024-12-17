import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-docente',
  templateUrl: './perfil-docente.component.html',
  styleUrls: ['./perfil-docente.component.scss'],
})
export class PerfilDocenteComponent implements OnInit {

  user: any; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = '1'; 
    this.getUserById(userId);
  }

  getUserById(id: string) {
    this.http.get(`http://localhost:3000/users/${id}`).subscribe(data => {
      this.user = data; 
    }, error => {
      console.error('Error al obtener los datos del usuario', error);
    });
  }
}
