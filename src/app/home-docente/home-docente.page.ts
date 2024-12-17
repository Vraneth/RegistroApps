import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage {

  constructor(private router: Router) {}

  // Controla la navegación entre las secciones
  segmentChanged($event: any){
    console.log($event.detail.value);
    let direction = $event.detail.value;
    this.router.navigate([`home-docente/${direction}`]);
  }
}
