import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';



@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
    `.ng-invalid.ng-touched:not(form)  {
    border: 1px solid red;

  }
 `
  ]
})
export class TemplateComponent {
  nombre: string;
  constructor() {}

  usuario = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'F',
    acepta: false
  };

  paises = [
    {
      codigo: 'CL',
      nombre: 'Chile'
    },
    {
      codigo: 'CRI',
      nombre: 'Costa Rica'
    },
    {
      codigo: 'ESP',
      nombre: 'España'
    }
  ];

  sexos: string[] = ['Masculino', 'Femenino' ];

  guardar(forma: NgForm) {
    console.log('formulario posteado');
    console.log('NgForm : ', forma);
    console.log('valor forma : ', forma.value);
    console.log('usuario : ', this.usuario);
  }
}
