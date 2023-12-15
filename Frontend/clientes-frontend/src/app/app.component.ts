import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientes-frontend';
  items = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: 'clientes' },
    {
      label: 'Clientes',
      icon: 'pi pi-fw pi-user',
      items: [
          {
              label: 'Nuevo',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: 'clientes/nuevo'
          },
          {
              label: 'Buscar',
              icon: 'pi pi-fw pi-users',
              routerLink: 'clientes'
          }
      ]
  },
  ];

}
