import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"criptomonedas-3746d","appId":"1:923138262134:web:2b3a20cd4d053a6bd0cb57","storageBucket":"criptomonedas-3746d.appspot.com","apiKey":"AIzaSyCgKDj3eeWEe-mJd2w4FPwDSWaPYmIi6qE","authDomain":"criptomonedas-3746d.firebaseapp.com","messagingSenderId":"923138262134"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
  
};
