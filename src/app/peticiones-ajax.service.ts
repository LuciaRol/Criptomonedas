import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import {getDocs, collection, onSnapshot } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})


export class PeticionesAJAXService {

  datosAPI:any [] = [];

  // inyección de dependencias
  firestore = inject(Firestore);
  datosFS: any [] = [];

  monedasAPI:any [] = [];
  

  constructor(private http: HttpClient) {

  }

   obtenerDatosFirestore(){
    getDocs(collection(this.firestore,"cripto")).then((response)=>{
      this.datosFS = response.docs.map(doc => doc.data())
      console.log(this.datosFS);
    });
   }

   peticionAJAXnombre(){
    return this.http.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false").subscribe((datos:any)=>{
  
      console.log(datos);
      this.monedasAPI = datos;
    });
  }
    
}
