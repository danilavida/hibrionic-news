// Importa inject y EnvironmentInjector desde @angular/core
import { Component, OnInit, inject, EnvironmentInjector } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'

import { NoticiasService } from '../services/noticias.service'
import { Noticia } from '../models/noticia.model'

import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    AlertController,
    ToastController
} from '@ionic/angular/standalone'

@Component({
    selector: 'app-news',
    templateUrl: 'news.page.html',
    styleUrls: ['news.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        IonIcon
    ]
})
export class NewsPage implements OnInit {
    public noticias$: Observable<Noticia[]>

    private environmentInjector = inject(EnvironmentInjector)

    constructor(
        private noticiasService: NoticiasService,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {
        this.noticias$ = new Observable<Noticia[]>()
    }

    ngOnInit() {
        this.noticias$ = this.noticiasService.getNoticias()
    }

    async eliminarNoticia(noticiaParaEliminar: Noticia) {
        console.log('Debug: Intentando eliminar:', noticiaParaEliminar)
        console.log('Debug: ID recibido para eliminar:', noticiaParaEliminar.id)

        if (!noticiaParaEliminar.id) {
            console.error('Debug: Error: ID de noticia no encontrado para eliminar.')
            this.mostrarToast('Error: No se pudo identificar la noticia.', 'danger')
            return
        }

        const alert = await this.alertCtrl.create({
            header: 'Confirmar Borrado',
            message: `¿Estás seguro de que deseas eliminar la noticia "${noticiaParaEliminar.titulo}"?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Eliminar',
                    cssClass: 'danger',
                    handler: () => {
                        console.log(
                            `Debug: Alert handler confirmado para ID: ${noticiaParaEliminar.id!}`
                        )
                        this._borrarNoticiaConfirmado(noticiaParaEliminar.id!)
                    }
                }
            ]
        })
        await alert.present()
    }

    private _borrarNoticiaConfirmado(id: string) {
        this.environmentInjector.runInContext(async () => {
            try {
                console.log(
                    `Debug: _borrarNoticiaConfirmado - Llamando a deleteNoticia con ID: ${id}`
                )
                await this.noticiasService.deleteNoticia(id)
                console.log(
                    'Debug: _borrarNoticiaConfirmado - Llamada a deleteNoticia completada.'
                )
                this.mostrarToast('Noticia eliminada correctamente.', 'success')
            } catch (error) {
                console.error('Debug: ERROR DETALLADO en _borrarNoticiaConfirmado:', error)
                this.mostrarToast('Error al eliminar la noticia.', 'danger')
            }
        })
    }

    async mostrarToast(
        mensaje: string,
        color: 'success' | 'danger' | 'warning' | 'primary'
    ) {
        const toast = await this.toastCtrl.create({
            message: mensaje,
            duration: 2500,
            color: color,
            position: 'top'
        })
        toast.present()
    }
}
