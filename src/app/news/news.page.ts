// Importa inject y EnvironmentInjector desde @angular/core
import { Component, OnInit, inject, EnvironmentInjector } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'

import { NoticiasService } from '../services/noticias.service'
import { Noticia } from '../models/noticia.model'

import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
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
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
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

    // --- 1. Inyecta EnvironmentInjector usando inject() ---
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

    // Método principal que muestra la alerta (sin cambios aquí)
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
                        // Llama al método privado
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

    // Método privado que ejecuta la lógica de borrado
    private _borrarNoticiaConfirmado(id: string) {
        // --- 2. Ejecuta la llamada al servicio DENTRO de runInContext ---
        this.environmentInjector.runInContext(async () => {
            try {
                console.log(
                    `Debug: _borrarNoticiaConfirmado - Llamando a deleteNoticia con ID: ${id}`
                )
                // La llamada al servicio ahora está envuelta
                await this.noticiasService.deleteNoticia(id)
                console.log(
                    'Debug: _borrarNoticiaConfirmado - Llamada a deleteNoticia completada.'
                )
                // Mostrar toast también necesita contexto si usa DI internamente, así que lo dejamos dentro
                this.mostrarToast('Noticia eliminada correctamente.', 'success')
            } catch (error) {
                console.error('Debug: ERROR DETALLADO en _borrarNoticiaConfirmado:', error)
                // Mostrar toast también necesita contexto si usa DI internamente
                this.mostrarToast('Error al eliminar la noticia.', 'danger')
            }
        }) // --- Fin de runInContext ---
    }

    // Método auxiliar para mostrar Toast (sin cambios)
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
