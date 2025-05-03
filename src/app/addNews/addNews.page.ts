import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    LoadingController,
    AlertController
} from '@ionic/angular/standalone'

import { NoticiasService } from '../services/noticias.service'

@Component({
    selector: 'app-addNews',
    templateUrl: 'addNews.page.html',
    styleUrls: ['addNews.page.scss'],
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonDatetimeButton,
        IonModal,
        IonDatetime,
        IonButton,
        IonIcon,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent
    ]
})
export class AddNewsPage {
    noticiaTitulo: string = ''
    noticiaFecha: string = ''
    noticiaDescripcion: string = ''
    noticiaImagenUrl: string = ''

    isDatePickerOpen = false

    constructor(
        private noticiasService: NoticiasService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {}

    async agregarNoticia() {
        if (!this.noticiaTitulo || !this.noticiaFecha || !this.noticiaDescripcion) {
            this.mostrarAlerta(
                'Error',
                'Los campos Título, Fecha y Descripción son requeridos.'
            )
            return
        }

        const loading = await this.loadingCtrl.create({ message: 'Guardando noticia...' })
        await loading.present()

        const nuevaNoticia = {
            titulo: this.noticiaTitulo,
            fecha: this.noticiaFecha,
            descripcion: this.noticiaDescripcion,
            ...(this.noticiaImagenUrl && { imagenUrl: this.noticiaImagenUrl })
        }

        try {
            await this.noticiasService.addNoticia(nuevaNoticia)
            await loading.dismiss()
            this.limpiarFormulario()
            this.mostrarAlerta('Éxito', 'Noticia guardada correctamente.')
        } catch (error) {
            await loading.dismiss()
            console.error('Error al guardar la noticia:', error)
            this.mostrarAlerta(
                'Error',
                'No se pudo guardar la noticia. Inténtalo de nuevo.'
            )
        }
    }

    limpiarFormulario() {
        this.noticiaTitulo = ''
        this.noticiaFecha = ''
        this.noticiaDescripcion = ''
        this.noticiaImagenUrl = ''
    }

    async mostrarAlerta(titulo: string, mensaje: string) {
        const alert = await this.alertCtrl.create({
            header: titulo,
            message: mensaje,
            buttons: ['OK']
        })
        await alert.present()
    }

    handleDateChange(event: any) {
        this.noticiaFecha = event.detail.value
    }

    setOpen(isOpen: boolean) {
        this.isDatePickerOpen = isOpen
    }
}
