import { createReducer, on } from "@ngrx/store";
import { agregarCliente, cargarClientes, cargarClientesConFiltro, clienteAgregado, clienteEliminado, clienteModificado, clientesCargados, eliminarCliente, modificarCliente } from "../actions/clientes.actions";
import { ClientesState } from "src/app/models/clientes.state";

export const initialState: ClientesState = { loading: false, clientes: [], agregado: false, eliminado: false };

export const clientesReducer = createReducer(
    initialState,
    
    on(cargarClientes, (state) => {
        return {...state , loading: true, agregado: false}
    }),
    on(cargarClientesConFiltro, (state, {filtro})=> {
        return {...state , loading: true, filtro}
    }),
    on(clientesCargados, (state, {clientes}) => {
        return {...state , loading: false, clientes}
    }),
    on(agregarCliente, (state, {cliente}) => {
        return {...state , loading: true, cliente, agregado: false}
    }),
    on(clienteAgregado, (state) => {
        return {...state , loading: false, agregado: true}
    }),
    on(modificarCliente, (state, {cliente}) => {
        return {...state , loading: true, cliente, agregado: false}
    }),
    on(clienteModificado, (state) => {
        return {...state , loading: false, agregado: true}
    }),
    on(eliminarCliente, (state, {id}) => {
        return {...state , loading: true, id, eliminado: false}
    }),
    on(clienteEliminado, (state) => {
        return {...state , loading: false, eliminado: true}
    })
)
