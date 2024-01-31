import { Component, Input, inject, OnInit,  Output, EventEmitter, NgModule } from '@angular/core';
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
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit{
  detalle_moneda_id: any;
  id_moneda :any [] = [];
  id_moneda_final: any [] = [];
  array_prices: any[] = [];
  @Input() monedaSeleccionada: any;
  @Output() monedaSeleccionadaEvent = new EventEmitter<any>();
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();
   
  /* private route = inject(ActivatedRoute); */
  constructor(private route: ActivatedRoute, public ajax:PeticionesAJAXService ,  private router:Router, public detalles: detalles) 
  {}


  

  ngOnInit():void{
    this.lanzadaPeticionEvent.emit("Peticion en curso")
    this.router.navigate(['/detalle'])
    
      this.id_moneda = this.detalles.mostrar()
      
      this.detalle_moneda_id = this.id_moneda[0]
      console.log(this.detalle_moneda_id.id);
     
   
      this.ajax.peticionAJAXdetalle(this.detalle_moneda_id.id); 
      
      /*this.ajax.peticionAJAXgrafico(this.detalle_moneda_id.id, 7);
      con esta petición se obtienen los datos para hacer el gráfico. 
      No soy capaz de realizar el gráfico con el array ya preparado...*/
      
  }
}
