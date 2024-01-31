import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { PeticionesAJAXService } from '../peticiones-ajax.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DetalleComponent } from '../detalle/detalle.component';
import { detalles} from '../cart.service';
import { interval, Subscription } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DetalleComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  private consultaSubscription: Subscription = new Subscription();
  monedaIdSeleccionada: any;
 
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();

  constructor(public ajax:PeticionesAJAXService, private router:Router, private detalles: detalles) {
  }
  ngOnInit() {
    // Iniciar la consulta al cargar el componente
    this.startConsulta();
  }
  
  obtenDatosFS(){
    this.ajax.obtenerDatosFirestore();
    console.log("Consulta")
  }

  borrarMonedaid(id:any){
    console.log(id);
    this.ajax.borrarMoneda(id)
  }

  
  startConsulta() {
    this.obtenDatosFS();
    const timeoutDuration = 600000; // 10 minutes

    //Configura un temporizador para que obtenDatosFS() se ejecute cada 5
    this.consultaSubscription = interval(5000) // 5000 milisegundos = 5 segundos
      .subscribe(() => {
        this.obtenDatosFS();
      });
      setTimeout(() => {
        if (this.consultaSubscription) {
          this.consultaSubscription.unsubscribe();
          console.log("Consulta parada por timeout.");
        }
      }, timeoutDuration);

  }  





  
}
