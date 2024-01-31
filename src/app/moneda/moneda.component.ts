import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { PeticionesAJAXService } from '../peticiones-ajax.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { DetalleComponent } from '../detalle/detalle.component';
import { detalles} from '../cart.service';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { Firestore } from '@angular/fire/firestore';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DetalleComponent],
  templateUrl: './moneda.component.html',
  styleUrl: './moneda.component.css'
})
export class monedaComponent{
  private consultaSubscription: Subscription = new Subscription();
  //definición del tipo
  monedaIdSeleccionada: any;
  contenidoImput="";
  objetoFiltrado : any;
  
  @Output() monedaSeleccionadaEvent = new EventEmitter<any>();
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();
  
  
  constructor(public ajax:PeticionesAJAXService, private router:Router, private detalles: detalles) {
  }

  ngOnInit() {
    // Iniciar la consulta al cargar el componente
    this.startConsulta();
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
  
  startConsulta() {
    this.obtenDatos();

    // Configura un temporizador para que obtenDatos() se ejecute cada 30 segundos para no saturar la api. Desactivado
    /*this.consultaSubscription = interval(30000) // 10000 milisegundos = 30 segundos
      .subscribe(() => {
        this.obtenDatos();
      });
      console.log("30 segundos");*/
  }  
}


