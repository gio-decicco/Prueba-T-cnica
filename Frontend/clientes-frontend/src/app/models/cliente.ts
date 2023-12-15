import { Contacto } from "./contacto";
import { Direccion } from "./direccion";

export interface Cliente {
    id: number;
    dni: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: any;
    direccion: Direccion;
    contactos: Contacto[];
}