import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDocentePage } from './home-docente.page';
import { CrearClaseComponent } from '../crear-clase/crear-clase.component';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDocentePage,
    children:[
      {
        path:'crear-clase',
        component: CrearClaseComponent
      },
      {
        path:'crear-usuario',
        component: CrearUsuarioComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDocentePageRoutingModule {}
