import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './clientes/listar/listar.component';
import { NuevoComponent } from './clientes/nuevo/nuevo.component';
import { ModificarComponent } from './clientes/modificar/modificar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path:'clientes',
    component: ListarComponent,
  },
  {
    path: 'clientes/nuevo',
    component: NuevoComponent
  },
  {
    path: 'clientes/modificar/:id',
    component: ModificarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
