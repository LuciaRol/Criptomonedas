import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import {getDocs, collection, onSnapshot, doc, addDoc} from "firebase/firestore";
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

   
   subirDatosFirestore(data: any){
    addDoc(collection(this.firestore, "cripto"), {data});
   }

   peticionAJAXnombre(){
    return this.http.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false").subscribe((datos:any)=>{
  
      console.log(datos);
      this.monedasAPI = datos;
    });
  }
    
}
