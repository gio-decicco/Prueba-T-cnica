import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ClientesState } from "src/app/models/clientes.state";

export const selectClientesFeature = (state: AppState) => state.clientes;

export const selectListClientes = createSelector(
    selectClientesFeature,
    (state: ClientesState) => state.clientes
)

export const selectLoading = createSelector(
    selectClientesFeature,
    (state: ClientesState) => state.loading
)

export const selectAgregado = createSelector(
    selectClientesFeature,
    (state: ClientesState) => state.agregado
)

export const selectEliminado = createSelector(
    selectClientesFeature,
    (state: ClientesState) => state.eliminado
)