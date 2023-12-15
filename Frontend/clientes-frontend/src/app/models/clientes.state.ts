import { Cliente } from "./cliente";

export interface ClientesState{
    loading: boolean,
    clientes: ReadonlyArray<Cliente>;
    agregado: boolean
    eliminado: boolean
}