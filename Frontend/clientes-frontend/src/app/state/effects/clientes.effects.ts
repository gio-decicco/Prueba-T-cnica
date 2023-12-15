import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, mergeMap } from "rxjs";
import { ClienteService } from "src/app/services/cliente.service";
import { CARGAR_CLIENTES, CLIENTES_CARGADOS, CLIENTE_AGREGADO, CLIENTE_ELIMINADO, CLIENTE_MODIFICADO, CLIENTE_NO_AGREGADO, agregarCliente, cargarClientesConFiltro, eliminarCliente, modificarCliente } from "../actions/clientes.actions";
import Swal from "sweetalert2";

@Injectable()
export class ClientesEffects{
    
    constructor(
        private actions$: Actions,
        private service: ClienteService
    ){}

    loadClientes$ = createEffect(() => this.actions$.pipe(
            ofType(CARGAR_CLIENTES),
            mergeMap(() => this.service.getAllClientes()
                .pipe(
                    map(clientes => ({ type: CLIENTES_CARGADOS, clientes})),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    loadClientesByFiltro$ = createEffect(() => this.actions$.pipe(
        ofType(cargarClientesConFiltro), 
        mergeMap((action) => {
            const parametros = action.filtro;
            return this.service.getClientesByFiltros(parametros)
                .pipe(
                    map(clientes => ({ type: CLIENTES_CARGADOS, clientes})),
                    catchError(() => EMPTY)
                );
        })
    ));

    agregarCliente$ = createEffect(() => this.actions$.pipe(
        ofType(agregarCliente), 
        mergeMap((action) => {
            const cliente = action.cliente;
            return this.service.saveCliente(cliente)
                .pipe(
                    map(cliente => ({ type: CLIENTE_AGREGADO})),
                    catchError(() => {Swal.fire('Error', 'No se pudo insertar el cliente', 'error'); return EMPTY})
                );
        })
    ));

    modificarCliente$ = createEffect(() => this.actions$.pipe(
        ofType(modificarCliente), 
        mergeMap((action) => {
            const cliente = action.cliente;
            return this.service.updateCliente(cliente)
                .pipe(
                    map(cliente => ({ type: CLIENTE_MODIFICADO, cliente})),
                    catchError(() => {Swal.fire('Error', 'No se pudo modificar el cliente', 'error'); return EMPTY})
                );
        })
    ))

    eliminarCliente$ = createEffect(() => this.actions$.pipe(
        ofType(eliminarCliente), 
        mergeMap((action) => {
            const id = action.id;
            return this.service.deleteCliente(id)
                .pipe(
                    map(() => ({ type: CLIENTE_ELIMINADO, id})),
                    catchError(() => {Swal.fire('Error', 'No se pudo eliminar el cliente', 'error'); return EMPTY})
                );
        })
    ))
}