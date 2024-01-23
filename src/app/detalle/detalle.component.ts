import { Component, Input, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{
  @Input() id:string = "";
  /* private route = inject(ActivatedRoute); */

  ngOnInit():void{

    // lanzar petición ajax del detalle
    console.log(this.id);

  }
}
