import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ConsultaCliente } from '../models/dtos/consulta-cliente';

@Injectable()
export class ClienteService {
    url = 'http://localhost:5044/api/clientes'

    constructor(private http: HttpClient) { }

    getClientesByFiltros(consultaCliente: ConsultaCliente | null): Observable<Cliente>{
        if(consultaCliente != null){
            var filtros = '?';
            if(consultaCliente.dni != null && consultaCliente.dni != 0){
                filtros += `&dni=${consultaCliente.dni}`;
            }
            if(consultaCliente.nombre != null && consultaCliente.nombre != ''){
                filtros += `&nombre=${consultaCliente.nombre}`;
            }
            if(consultaCliente.apellido != null && consultaCliente.apellido != ''){
                filtros += `&apellido=${consultaCliente.apellido}`;
            }
            if(consultaCliente.fechaNacimiento != null){
                filtros += `&fechaNacimiento=${consultaCliente.fechaNacimiento}`;
            }
            var resultado = this.http.get<Cliente>(`${this.url}${filtros}`);
            console.log('Resultado con filtros', resultado.subscribe(data => console.log(data)));
            return resultado;
        }
        return this.getAllClientes();
    }
    getAllClientes(): Observable<Cliente>{
        var result = this.http.get<Cliente>(this.url);
        result.subscribe(data => console.log(data));
        return result;
    }
    saveCliente(cliente: Cliente): Observable<Cliente>{
        return this.http.post<Cliente>(this.url, cliente);
    }
    updateCliente(cliente: Cliente): Observable<Cliente>{
        return this.http.put<Cliente>(this.url + `/${cliente.id}`, cliente);
    }
    deleteCliente(id: number): Observable<number>{
        return this.http.delete<number>(this.url + `/${id}`);
    }
}