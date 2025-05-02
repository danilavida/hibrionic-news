import { Injectable } from '@angular/core'
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore'
import { Noticia } from '../models/noticia.model'
import { Observable } from 'rxjs'
// import { map } from 'rxjs/operators'; // No lo usamos activamente ahora, pero puede ser útil

@Injectable({
    providedIn: 'root'
})
export class NoticiasService {
    // Ordena por fecha descendente al obtener la referencia
    private noticiasCollection: AngularFirestoreCollection<Noticia>

    constructor(private afs: AngularFirestore) {
        // Ordenamos por fecha descendente aquí
        this.noticiasCollection = afs.collection<Noticia>('noticias', (ref) =>
            ref.orderBy('fecha', 'desc')
        )
    }

    // Método para AGREGAR una nueva noticia (incluye imagenUrl opcional)
    addNoticia(noticiaData: {
        titulo: string
        fecha: string
        descripcion: string
        imagenUrl?: string
    }): Promise<any> {
        const noticiaParaGuardar: Noticia = {
            ...noticiaData
            // createdAt: serverTimestamp() // Podrías añadir timestamp si importas funciones de 'firebase/firestore'
        }
        return this.noticiasCollection.add(noticiaParaGuardar)
    }

    // Método para OBTENER todas las noticias
    getNoticias(): Observable<Noticia[]> {
        // Asegura que idField esté presente para obtener el ID del documento
        return this.noticiasCollection.valueChanges({ idField: 'id' })
    }

    // Método para ELIMINAR una noticia
    deleteNoticia(id: string): Promise<void> {
        if (!id) {
            return Promise.reject(new Error('ID inválido proporcionado para eliminar'))
        }
        return this.noticiasCollection.doc(id).delete()
    }
}
