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
  descripcionmoneda:any;
  graficomoneda: any;
  from: any;
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
    this.loading = true;
    return this.http.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false").subscribe((datos:any)=>{
  
      console.log(datos);
      this.monedasAPI = datos;
      this.loading = false;
    });
  }

  
  peticionAJAXdetalle(coinID : string) {
    this.loading = true;
    this.http.get<any>("https://api.coingecko.com/api/v3/coins/"+ coinID)
      .subscribe(data => {
        this.detallemoneda = data;
        this.loading = false;
      
      });
  }
  
  peticionAJAXgrafico(coinID : string, days: any) {

    this.http.get<any>("https://api.coingecko.com/api/v3/coins/" + coinID + "/market_chart/range?vs_currency=eur&from="+ this.getfromUnixTimestamp(days) + "&to=" + this.getCurrentUnixTimestamp())
      .subscribe(data => {
        this.graficomoneda = data;
        this.graficomoneda = this.graficomoneda.prices
        this.loading = false;
        console.log(this.graficomoneda)
        
      });
  }

  getCurrentUnixTimestamp(): number {
    // Get current time in milliseconds
    const currentTime = new Date().getTime();
    // Convert milliseconds to seconds and return
    return Math.floor(currentTime);
  }
  
  getfromUnixTimestamp(days: any): number {
    const millisecondsInWeek = days * 24 * 60 * 60 * 1000; // Milisegundos en una semana
    const currentTime = new Date().getTime(); // Obtener el tiempo actual en milisegundos
    const timestampOneWeekAgo = currentTime - millisecondsInWeek; // Restar una semana al tiempo actual
    return Math.floor(timestampOneWeekAgo / 1000); // Convertir milisegundos a segundos y redondear
  }
}
