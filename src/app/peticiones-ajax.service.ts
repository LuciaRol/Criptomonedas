import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import {getDocs, collection, onSnapshot, deleteDoc, doc, addDoc, query, where} from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class PeticionesAJAXService {

  datosAPI:any [] = [];
  
  // inyección de dependencias
  firestore = inject(Firestore);
  datosFS: any [] = [];
  loading: boolean = true;
  monedasAPI:any [] = [];
  detallemoneda:any;
  constructor(public http: HttpClient) {

  }

   obtenerDatosFirestore(){
    getDocs(collection(this.firestore,"cripto")).then((response)=>{
      this.datosFS = response.docs.map(doc => doc.data())
      console.log(this.datosFS);
    });
   }

  
  
  async borrarMoneda(id: string) {
    const collectionRef = collection(this.firestore, "cripto");
    const querySnapshot = await getDocs(collectionRef);
    
    querySnapshot.forEach((doc) => {
        const data = doc.data(); 
        Object.values(data).forEach((item: any) => {
            if (item.id === id) {
                deleteDoc(doc.ref);
            }
        });
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

  
  peticionAJAXdetalle(coinID : string) {
    this.http.get<any>("https://api.coingecko.com/api/v3/coins/"+ coinID)
      .subscribe(data => {
        this.detallemoneda = data;
        this.loading = false;
        console.log(this.detallemoneda); // Logging the data to verify
        console.log("peticion ajaxthis.detallemoneda dentro de peticionajaxdetalle");
        
      });
  }
  

  
    
}
