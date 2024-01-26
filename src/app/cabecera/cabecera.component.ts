import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {
  ngOnInit() {
      console.log("se inicia la CABECERA")
  }

  // constrcutor donde se declaran las rutas tipo Router
  constructor (private router:Router){}

  cerrarSesion(){
    this.router.navigate(["/"]) //"fuerza ir a inicio y actualiza el contenido"
  }
}
