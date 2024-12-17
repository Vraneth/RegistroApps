import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profesor-perfil',
  templateUrl: './profesor-perfil.component.html',
  styleUrls: ['./profesor-perfil.component.scss'],
})
export class ProfesorPerfilComponent implements OnInit {

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
