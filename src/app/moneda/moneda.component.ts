import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { PeticionesAJAXService } from '../peticiones-ajax.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { DetalleComponent } from '../detalle/detalle.component';
import { detalles} from '../cart.service';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DetalleComponent],
  templateUrl: './moneda.component.html',
  styleUrl: './moneda.component.css'
})
export class monedaComponent {
  //definición del tipo
  monedaIdSeleccionada: any;
  contenidoImput="";
  objetoFiltrado : any;
  @Output() monedaSeleccionadaEvent = new EventEmitter<any>();
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();
  
  constructor(public ajax:PeticionesAJAXService, private router:Router, private detalles: detalles) {
  }

  obtenDatos(){
    this.lanzadaPeticionEvent.emit("Peticion en curso")
    this.router.navigate(['/detalle/lucia'])
    this.ajax.obtenerDatosFirestore();
    this.ajax.peticionAJAXnombre();
  }

  nuevoValor(){
    this.ajax.datosAPI.push(this.contenidoImput);
  }

  borrarValor(posicion:any){
    this.ajax.datosAPI.splice(posicion,1);
  }

  mostrarDetalle(id:any){
    console.log("navegando al detalle del "+id)
    this.router.navigate(["detalle", id])
  }

  verDetalles(json: any, id: string) {
    this.objetoFiltrado = Object.values(json).find((objeto: any) => objeto.id === id);
    this.detalles.borrardetalle()
    this.detalles.detalle(this.objetoFiltrado);
    console.log(this.detalles.mostrar())
  }

  guardarMoneda(json: any, id: string) {
    this.objetoFiltrado = Object.values(json).find((objeto: any) => objeto.id === id);
    this.detalles.borrardetalle()
    this.detalles.detalle(this.objetoFiltrado);
    console.log(this.detalles.mostrar());
    this.ajax.subirDatosFirestore(this.objetoFiltrado);
    /*aquí falta el push a base de datos this.detalles.mostrar()*/
    this.detalles.borrardetalle()
  }

     
}


