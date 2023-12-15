import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { Cliente } from 'src/app/models/cliente';
import { agregarCliente } from 'src/app/state/actions/clientes.actions';
import { AppState } from 'src/app/state/app.state';
import { selectAgregado } from 'src/app/state/selectors/clientes.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  formCliente: FormGroup = new FormGroup({});
  cities: any[] = [
    { name: 'New York', code: 'NY' },
  ]
  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.formCliente = this.fb.group({
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
      contactos: this.fb.array([
        this.fb.group({
          tipo: ['', [Validators.required]],
          descripcion: ['', [Validators.required, Validators.maxLength(50)]]
        })
      ])
    })
  }

  get contactos(): FormArray {
    const array = this.formCliente.get('contactos') as FormArray;
    return array;
  }

  agregarContacto(){
    this.contactos.push( 
      this.fb.group({
        tipo: ['', [Validators.required]],
        descripcion: ['', [Validators.required, Validators.maxLength(50)]]
    }))

    console.log(this.formCliente.value);
  }

  quitarContacto(i: number){
    this.contactos.removeAt(i);
  }

  onSubmit(){
    if(this.formCliente.valid){
      var cliente = this.formCliente.value as Cliente;
      cliente.fechaNacimiento = format(cliente.fechaNacimiento, 'yyyy-MM-dd');
      this.store.dispatch(agregarCliente({ cliente }));
      this.store.select(selectAgregado).subscribe(agregado => {
        if(agregado){
          Swal.fire({
            title: 'Cliente Agregado!',
            timer: 2000
          })
          this.router.navigate(['clientes']);
        }
      })
    }
  }
}
