import { Injectable } from '@angular/core'
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore'
import { Noticia } from '../models/noticia.model'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class NoticiasService {
    private noticiasCollection: AngularFirestoreCollection<Noticia>

    constructor(private afs: AngularFirestore) {
        this.noticiasCollection = afs.collection<Noticia>('noticias', (ref) =>
            ref.orderBy('fecha', 'desc')
        )
    }

    addNoticia(noticiaData: {
        titulo: string
        fecha: string
        descripcion: string
        imagenUrl?: string
    }): Promise<any> {
        const noticiaParaGuardar: Noticia = {
            ...noticiaData
        }
        return this.noticiasCollection.add(noticiaParaGuardar)
    }

    getNoticias(): Observable<Noticia[]> {
        return this.noticiasCollection.valueChanges({ idField: 'id' })
    }

    deleteNoticia(id: string): Promise<void> {
        if (!id) {
            return Promise.reject(new Error('ID inválido proporcionado para eliminar'))
        }
        return this.noticiasCollection.doc(id).delete()
    }
}
