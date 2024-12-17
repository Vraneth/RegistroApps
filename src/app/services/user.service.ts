import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { "id": "1", "name": "Marcelo Pino", "email": "mpino@profesor.duocuc.cl", "password": "123456789", "ocupacion": "Profesor", "rol": "user" },
    { "id": "2", "name": "Marco Baez", "email": "mar.baez@profesor.duocuc.cl", "password": "123456789", "ocupacion": "Profesor", "rol": "user" },
    { "id": "3", "name": "Ana Jhonson", "email": "ajon@profesor.duocuc.cl", "password": "123456789", "ocupacion": "Profesor", "rol": "user" },
    { "id": "4", "name": "Major Tom", "email": "mtom@profesor.duocuc.cl", "password": "123456789", "ocupacion": "Profesor", "rol": "user" },
    { "id": "5", "name": "Tyler Okonma", "email": "tokonma@profesor.duocuc.cl", "password": "123456789", "ocupacion": "Profesor", "rol": "user" },
    { "id": "6", "name": "Cristian Camus", "email": "c.camus@duocuc.cl", "password": "123456789", "ocupacion": "Alumno", "rol": "user" },
    { "id": "7", "name": "Julian Casablancas", "email": "jcasablancas@duocuc.cl", "password": "123456789", "ocupacion": "Alumno", "rol": "user" },
    { "id": "8", "name": "Magdalena Bay", "email": "mbay@duocuc.cl", "password": "123456789", "ocupacion": "Alumno", "rol": "user" },
    { "id": "9", "name": "Alain Delon", "email": "adelon@duocuc.cl", "password": "123456789", "ocupacion": "Alumno", "rol": "user" },
    { "id": "10", "name": "Jean Pierre-Melville", "email": "jpierre@duocuc.cl", "password": "123456789", "ocupacion": "Alumno", "rol": "user" },
    { "id": "11", "name": "Administrador", "email": "admin@admin.cl", "password": "admin", "ocupacion": "Administrator", "rol": "admin" }
  ];

  constructor() {}

  // Método para obtener el id del usuario dado el email
  getUserIdByEmail(email: string): string | null {
    const user = this.users.find(user => user.email === email);
    return user ? user.id : null;
  }

  // Método para obtener el id del usuario dado el nombre
  getUserIdByName(name: string): string | null {
    const user = this.users.find(user => user.name === name);
    return user ? user.id : null;
  }
}
