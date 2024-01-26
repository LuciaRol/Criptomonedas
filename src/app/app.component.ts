import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {CabeceraComponent} from './cabecera/cabecera.component';
import { LandingComponent } from './landing/landing.component';
import {monedaComponent } from './moneda/moneda.component';
import {DetalleComponent} from './detalle/detalle.component';
import { PieComponent } from './pie/pie.component';


//decoradorr
@Component({
  selector: 'app-root', //nombre del tag
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, CabeceraComponent, monedaComponent, DetalleComponent, PieComponent, LandingComponent], //cosas que usa el componente
  templateUrl: './app.component.html', //aquí tengo el html
  styleUrl: './app.component.css' //aquí tengo el css asociado al componente
})


export class AppComponent implements OnInit{
  title = 'el decorador funciona';
  nombreUsuario = 'lucia'
  urlImagen = "https://angular.io/assets/images/logos/angular/shield-large.svg";
  id = "";

  // ngOnInit inicializa el componente
  ngOnInit(){
    console.log("se inicia la APP")
  }

  cambiaTitulo(){
    console.log("salta evento cambiar titulo()")
  }

  pulsadaTecla(){
    console.log("has pulsado una tecla")
    console.log(this.title)
    this.title = ""

  }

  trataEventoDeHijo(datoRecibido:string){
    console.log("salta evento output con dato = " + datoRecibido)
    this.id=datoRecibido;
  }
}
