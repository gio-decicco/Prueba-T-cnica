import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { Cliente } from 'src/app/models/cliente';
import { cargarClientes, modificarCliente } from 'src/app/state/actions/clientes.actions';
import { AppState } from 'src/app/state/app.state';
import { selectAgregado, selectListClientes } from 'src/app/state/selectors/clientes.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  formModificarCliente: FormGroup = new FormGroup({})
  cliente!: Cliente;
  id!: number

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { 

      this.formModificarCliente = this.fb.group({
        dni: ['', [Validators.required, Validators.min(1), Validators.max(99999999)]],
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        apellido: ['', [Validators.required, Validators.maxLength(50)]],
        fechaNacimiento: ['', [Validators.required]],
        direccion: this.fb.group({
          calle: ['', [Validators.required, Validators.maxLength(50)]],
          nroCalle: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
          ciudad: ['', [Validators.required, Validators.maxLength(50)]],
          provincia: ['', [Validators.required, Validators.maxLength(50)]],
          pais: ['', [Validators.required, Validators.maxLength(50)]]
        }),
        contactos: this.fb.array([])
      })
    }

  ngOnInit() {
    this.store.dispatch(cargarClientes());
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.store.select(selectListClientes).subscribe(clientes => {
        this.cliente = clientes.find(c => c.id == this.id)!;
        console.log(this.cliente)
        this.formModificarCliente = this.fb.group({
          dni: [this.cliente.dni, [Validators.required, Validators.min(1), Validators.max(99999999)]],
          nombre: [this.cliente.nombre, [Validators.required, Validators.maxLength(50)]],
          apellido: [this.cliente.apellido, [Validators.required, Validators.maxLength(50)]],
          fechaNacimiento: [new Date(this.cliente.fechaNacimiento), [Validators.required]],
          direccion: this.fb.group({
            calle: [this.cliente.direccion.calle, [Validators.required, Validators.maxLength(50)]],
            nroCalle: [this.cliente.direccion.nroCalle, [Validators.required, Validators.min(1), Validators.max(100000)]],
            ciudad: [this.cliente.direccion.ciudad, [Validators.required, Validators.maxLength(50)]],
            provincia: [this.cliente.direccion.provincia, [Validators.required, Validators.maxLength(50)]],
            pais: [this.cliente.direccion.pais, [Validators.required, Validators.maxLength(50)]]
          }),
          contactos: this.fb.array([])
        })
        this.cliente.contactos.forEach(contacto => {
          this.contactos.push(
            this.fb.group({
              tipo: [contacto.tipo, [Validators.required]],
              descripcion: [contacto.descripcion, [Validators.required, Validators.maxLength(50)]]
            })
          )
        });    
      })
    })

    

    
  }

  get contactos(): FormArray {
    const array = this.formModificarCliente.get('contactos') as FormArray;
    return array;
  }

  agregarContacto(){
    this.contactos.push( 
      this.fb.group({
        tipo: ['', [Validators.required]],
        descripcion: ['', [Validators.required, Validators.maxLength(50)]]
    }))

    console.log(this.formModificarCliente.value);
  }

  quitarContacto(i: number){
    this.contactos.removeAt(i);
  }

  onSubmit(){
    if(this.formModificarCliente.valid){
      var cliente = this.formModificarCliente.value as Cliente;
      cliente.fechaNacimiento = format(cliente.fechaNacimiento, 'yyyy-MM-dd');
      cliente.id = this.id;
      this.store.dispatch(modificarCliente({ cliente }));
      this.store.select(selectAgregado).subscribe(agregado => {
        if(agregado){
          Swal.fire({
            title: 'Cliente Modificado!',
            timer: 2000
          })
          this.router.navigate(['clientes']);
        }
      })
    }
  }
}
