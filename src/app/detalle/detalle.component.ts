import { Component, Input, inject, OnInit,  Output, EventEmitter } from '@angular/core';
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
  detalle_moneda_id: any;
  id_moneda :any [] = [];
  id_moneda_final: any [] = [];
  @Input() monedaSeleccionada: any;
  @Output() monedaSeleccionadaEvent = new EventEmitter<any>();
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();
  /* private route = inject(ActivatedRoute); */
  constructor(private route: ActivatedRoute, public ajax:PeticionesAJAXService ,  private router:Router, public detalles: detalles) {    
  }

  ngOnInit():void{
    this.lanzadaPeticionEvent.emit("Peticion en curso")
    this.router.navigate(['/detalle/lucia'])
    
      this.id_moneda = this.detalles.mostrar()
      
      this.detalle_moneda_id = this.id_moneda[0]
      console.log(this.detalle_moneda_id.id);
     
   
      this.ajax.peticionAJAXdetalle(this.detalle_moneda_id.id); 
      
      /*this.id_moneda_final =  Object.values(this.ajax.detallemoneda)
      console.log("Esto de abajo cuando lo metemos en el array");
      console.log(this.id_moneda_final);*/
      // lanzar petición ajax del detalle
  }


}
