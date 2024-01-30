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
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DetalleComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  monedaIdSeleccionada: any;
 
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();

  constructor(public ajax:PeticionesAJAXService, private router:Router, private detalles: detalles) {
  }

  obtenDatosFS(){
    this.ajax.obtenerDatosFirestore();
    
  }

  borrarMonedaid(id:any){
    console.log(id);
    this.ajax.borrarMoneda(id)
  }






  
}
