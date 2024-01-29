import { Injectable } from '@angular/core';
import { monedaComponent } from './moneda/moneda.component';

@Injectable({
  providedIn: 'root'
})
export class detalles {
  items: monedaComponent[] = [];
  detalle(product: monedaComponent) {
    this.items.push(product);
  }

  mostrar() {
    return this.items;
  }

  borrardetalle() {
    this.items = [];
    return this.items;
  }
  constructor() { }
}
