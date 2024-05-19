import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-ef38a","appId":"1:377535476392:web:947cb75dabd01f56fe489d","storageBucket":"ring-of-fire-ef38a.appspot.com","apiKey":"AIzaSyC_RIt0hVlZMZybPv7Lz-5_m1pep2380AE","authDomain":"ring-of-fire-ef38a.firebaseapp.com","messagingSenderId":"377535476392"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
