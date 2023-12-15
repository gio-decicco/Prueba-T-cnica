import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConsultaCliente } from 'src/app/models/dtos/consulta-cliente';
import { cargarClientes, cargarClientesConFiltro, eliminarCliente } from 'src/app/state/actions/clientes.actions';
import { AppState } from 'src/app/state/app.state';
import { selectEliminado, selectListClientes, selectLoading } from 'src/app/state/selectors/clientes.selectors';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();
  clientes$: Observable<any> = new Observable();
  formFiltro: FormGroup = new FormGroup({});
  idSeleccionado!: number;
  itemsAcciones: any[] = [
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => this.borrar(this.idSeleccionado)
    }
  ];

  tiposContacto = new Map<number, string>([
    [1, 'Celular'],
    [2, 'Email'],
  ])

  constructor(private store: Store<AppState>, private fb: FormBuilder, private router: Router) {
      this.formFiltro = this.fb.group({
        dni: [null],
        nombre: [null],
        apellido: [null],
        fechaNacimiento: [null]
      })
   }

  ngOnInit() {
    this.store.dispatch(cargarClientes());
    this.loading$ = this.store.select(selectLoading);
    this.clientes$ = this.store.select(selectListClientes);
    this.clientes$.subscribe( data => {
      console.log(data)
    })
  }

  getClientesByFiltros(){
    var filtros: ConsultaCliente = this.formFiltro.value as ConsultaCliente;
    if(filtros.fechaNacimiento != null){
      filtros.fechaNacimiento = format(filtros.fechaNacimiento, 'yyyy-MM-dd');
    }
    
    if(this.hayFiltros(filtros)){
      console.log(filtros)
      this.store.dispatch(cargarClientesConFiltro({filtro: filtros}));
    }
    else{
      this.store.dispatch(cargarClientes());
    }
  }

  hayFiltros(consulta: ConsultaCliente){
    if(consulta.dni != null && consulta.dni != 0){
      return true;
    }
    if(consulta.nombre != null && consulta.nombre != ''){
      return true;
    }
    if(consulta.apellido != null && consulta.apellido != ''){
      return true;
    }
    if(consulta.fechaNacimiento != null){
      return true;
    }
    return false;
  }

  modificar(id: number){
    this.router.navigate(['clientes/modificar', id]);
  }
  borrar(id: number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(eliminarCliente({id}));
        this.store.select(selectEliminado).subscribe(eliminado => {
          if(eliminado){
            Swal.fire({
              title: 'Cliente Eliminado!',
              timer: 2000
        })
        this.store.dispatch(cargarClientes());
      }})}
    })
  }
}
