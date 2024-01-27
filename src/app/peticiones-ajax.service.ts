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
  

  constructor(private http: HttpClient) {

  }

   obtenerDatosFirestore(){
    getDocs(collection(this.firestore,"cripto")).then((response)=>{
      this.datosFS = response.docs.map(doc => doc.data())
      console.log(this.datosFS);
    });
   }

   peticionAJAX(){
    
    
    //ponemos search para buscar el campo que tenemos que buscar en la api (con la apigecko se pone datos a secas)
    return this.http.get("https://api.coingecko.com/api/v3/coins/markets").subscribe((datos:any)=>{
      console.log(datos);
    this.datosAPI = datos;
    

    // se pone el titulo que queremos
    /* return this.http.get("https://www.omdbapi.com/?s=cars&apikey=ba7933ec").subscribe((datos:any)=>{
    
      console.log(datos)
      this.datosAPI = datos.Search; */
    

    });
  }

  
}
