
import { Observable } from 'rxjs/rx';

import { FormArray, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

// FormGroup
// FormControl
// Validators


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  forma: FormGroup;

  usuario = {
    nombrecompleto: {
      nombre: 'christopher',
      apellido: 'aedo'
    },
    correo: 'christopher.aedo.p@gmail.com'
    // , pasatiempos: ['correo', 'dormir' , 'comer']
  };


  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({
      nombrecompleto: new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        apellido: new FormControl('', [Validators.required, this.noAedo])
      }),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]),
      pasatiempos: new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl()
    });

    this.forma.controls['password2'].setValidators([Validators.required, this.noIgual.bind( this.forma )]);


    this.forma.controls['username'].valueChanges.subscribe(data => {
      console.log(data);
    });

    this.forma.controls['username'].statusChanges.subscribe(data => {
      console.log(data);
    });

  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

  }
  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noAedo(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'aedo') {
      return {
        noaedo: true
      };
    }

    return null;
  }
  noIgual(control: FormControl): { [s: string]: boolean } {

    const forma: any = this;

    if (control.value !== forma.controls['password1'].value) {

      return { noiguales: true };
    }

    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise(
      (resolve , reject) => {
        setTimeout(() => {
          if ( control.value === 'shiro') {
            resolve({ existe: true} );
          }else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  }
}
