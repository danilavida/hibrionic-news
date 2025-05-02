import { Injectable } from '@angular/core'
// Importa AngularFirestore y AngularFirestoreCollection
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore'
// Importa tu interfaz Noticia
import { Noticia } from '../models/noticia.model'
// Importa Observable para el método getNoticias (lo usaremos después)
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root' // Servicio disponible en toda la app
})
export class NoticiasService {
    // Referencia a la colección 'noticias' en Firestore
    private noticiasCollection: AngularFirestoreCollection<Noticia>

    constructor(private afs: AngularFirestore) {
        // Inicializamos la referencia a la colección en el constructor
        // Asegúrate de que el nombre 'noticias' coincida con como quieres
        // llamar a tu colección en Firestore.
        this.noticiasCollection = afs.collection<Noticia>('noticias')
    }

    // --- Método para AGREGAR una nueva noticia ---
    addNoticia(noticiaData: {
        titulo: string
        fecha: string
        descripcion: string
        imagenUrl?: string
    }): Promise<any> {
        // Creamos un ID manualmente o dejamos que Firestore lo genere al usar add()
        // const id = this.afs.createId();
        // Preparamos el objeto a guardar
        const noticiaParaGuardar: Noticia = {
            // id, // Si generaste ID manualmente
            ...noticiaData
            // Podrías añadir campos extra aquí, como un timestamp de creación
            // createdAt: firebase.firestore.FieldValue.serverTimestamp() // Necesitaría import firebase
        }
        // Usamos add() para que Firestore genere el ID automáticamente
        return this.noticiasCollection.add(noticiaParaGuardar)
    }

    // --- Método para OBTENER todas las noticias (para la pestaña News) ---
    // Devuelve un Observable que emitirá la lista de noticias cada vez que cambie
    getNoticias(): Observable<Noticia[]> {
        return this.noticiasCollection.valueChanges({ idField: 'id' })
        // valueChanges() devuelve los datos. { idField: 'id' } añade el ID del documento al objeto.
        // Si necesitas ordenar, filtrar, etc., puedes añadir más lógica aquí.
        // Ejemplo ordenado por fecha (descendente):
        // return this.afs.collection<Noticia>('noticias', ref => ref.orderBy('fecha', 'desc'))
        //                 .valueChanges({ idField: 'id' });
    }

    // --- Método para ELIMINAR una noticia (para la pestaña News) ---
    deleteNoticia(id: string): Promise<void> {
        // Usamos doc(id) para apuntar al documento específico y luego delete()
        return this.noticiasCollection.doc(id).delete()
    }
}
