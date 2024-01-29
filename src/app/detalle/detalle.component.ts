import { Component, Input, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { PeticionesAJAXService } from '../peticiones-ajax.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { monedaComponent } from '../moneda/moneda.component';
import { detalles} from '../cart.service';



@Component({
  selector: 'app-detalle',
  standalone: true,
 
  imports: [CommonModule, FormsModule, RouterModule, monedaComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{
  detalle_moneda: any;
  @Input() monedaSeleccionada: any;
  /* private route = inject(ActivatedRoute); */
  constructor(private route: ActivatedRoute, public ajax:PeticionesAJAXService , public detalles: detalles) {    
  }

  ngOnInit():void{
      this.detalle_moneda = this.detalles.mostrar()
      // lanzar petición ajax del detalle
  }

  guardarMoneda() {

    this.ajax.subirDatosFirestore(this.detalles.mostrar());
  }


}
