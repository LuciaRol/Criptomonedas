import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { PeticionesAJAXService } from '../peticiones-ajax.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './moneda.component.html',
  styleUrl: './moneda.component.css'
})
export class monedaComponent {
  //definición del tipo
   
  contenidoImput="";
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();
  constructor(public ajax:PeticionesAJAXService, private router:Router) {
    
  }

  obtenDatos(){
    this.ajax.peticionAJAX();
    this.lanzadaPeticionEvent.emit("Peticion en curso")
    this.router.navigate(['/detalle/lucia'])
  }

  nuevoValor(){
    this.ajax.datosAPI.push(this.contenidoImput);
  }

  borrarValor(posicion:any){
    this.ajax.datosAPI.splice(posicion,1);
  }

  mostrarDetalle(id:any){
    console.log("navegando al detalle del "+id)
    this.router.navigate(["detalle", id, "lucia"])
  }

  pruebaAjax(){
    this.ajax.peticionAJAX();
  }
}


