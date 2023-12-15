import { ActionReducerMap } from "@ngrx/store";
import { ClientesState } from "../models/clientes.state";
import { clientesReducer } from "./reducers/clientes.reducer";

export interface AppState{
    clientes: ClientesState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    clientes: clientesReducer
}