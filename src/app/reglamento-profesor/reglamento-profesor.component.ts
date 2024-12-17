import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglamento-profesor',
  templateUrl: './reglamento-profesor.component.html',
  styleUrls: ['./reglamento-profesor.component.scss'],
})
export class ReglamentoProfesorComponent  {

  constructor(private router: Router) { }

  regresarALogin() {
      this.router.navigate(['/login']); 
    }

}
