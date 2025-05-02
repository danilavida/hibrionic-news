import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// --- Importaciones de Firebase (Método Compatible con NgModule) ---
// Importa el módulo principal de @angular/fire/compat
import { AngularFireModule } from '@angular/fire/compat'
// Importa el módulo de Firestore desde @angular/fire/compat/firestore
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
// Importa tu archivo de entorno donde guardaste la configuración
import { environment } from '../environments/environment'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot({}), // Configuración de Ionic
        AppRoutingModule,

        // --- Configuración de Firebase (Método Compatible con NgModule) ---
        // Inicializa Firebase usando AngularFireModule
        AngularFireModule.initializeApp(environment.firebaseConfig),

        // Habilita los servicios de Firestore usando AngularFirestoreModule
        AngularFirestoreModule
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
