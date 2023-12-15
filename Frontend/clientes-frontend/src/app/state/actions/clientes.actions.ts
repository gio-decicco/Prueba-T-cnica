import { createAction, props } from "@ngrx/store";
import { Cliente } from "src/app/models/cliente";
import { ConsultaCliente } from "src/app/models/dtos/consulta-cliente";


export const CARGAR_CLIENTES = '[ListarClientes] Cargar Clientes';
export const CARGAR_CLIENTES_CON_FILTRO = '[ListarClientes] Cargar Clientes con Filtro';
export const CLIENTES_CARGADOS = '[ListarClientes] Clientes Cargados';
// export const CARGA_CLIENTES_FALLIDA = '[ListarClientes] Carga Clientes Fallida';
export const AGREGAR_CLIENTE = '[NuevoCliente] Agregar Cliente';
export const CLIENTE_AGREGADO = '[NuevoCliente] Cliente Agregado';
export const CLIENTE_NO_AGREGADO = '[NuevoCliente] Cliente No Agregado';
export const MODIFICAR_CLIENTE = '[EditarCliente] Modificar Cliente';
export const CLIENTE_MODIFICADO = '[EditarCliente] Cliente Modificado';
export const ELIMINAR_CLIENTE = '[ListarClientes] Eliminar Cliente';
export const CLIENTE_ELIMINADO = '[ListarClientes] Cliente Eliminado';

export const cargarClientes = createAction(
    CARGAR_CLIENTES,
)
export const cargarClientesConFiltro = createAction(
    CARGAR_CLIENTES_CON_FILTRO,
    props<{ filtro: ConsultaCliente }>()
)
export const clientesCargados = createAction(
    CLIENTES_CARGADOS,
    props<{ clientes: Cliente[] }>()
)
export const agregarCliente = createAction(
    AGREGAR_CLIENTE,
    props<{ cliente: Cliente }>()
)
export const clienteAgregado = createAction(
    CLIENTE_AGREGADO
)
export const modificarCliente = createAction(
    MODIFICAR_CLIENTE,
    props<{ cliente: Cliente }>()
)
export const clienteModificado = createAction(
    CLIENTE_MODIFICADO,
)
export const eliminarCliente = createAction(
    ELIMINAR_CLIENTE,
    props<{ id: number }>()
)
export const clienteEliminado = createAction(
    CLIENTE_ELIMINADO
)