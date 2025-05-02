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
    IonCardContent, // <-- Añadidos Card*
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
        // --- Añadidos Card* ---
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
    noticiaImagenUrl: string = '' // <-- NUEVA propiedad para la URL

    isDatePickerOpen = false

    constructor(
        private noticiasService: NoticiasService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {}

    async agregarNoticia() {
        // Validación: Solo título, fecha y descripción son obligatorios por ahora
        if (!this.noticiaTitulo || !this.noticiaFecha || !this.noticiaDescripcion) {
            this.mostrarAlerta(
                'Error',
                'Los campos Título, Fecha y Descripción son requeridos.'
            )
            return
        }

        const loading = await this.loadingCtrl.create({ message: 'Guardando noticia...' })
        await loading.present()

        // Prepara el objeto incluyendo la URL de la imagen (si existe)
        const nuevaNoticia = {
            titulo: this.noticiaTitulo,
            fecha: this.noticiaFecha,
            descripcion: this.noticiaDescripcion,
            // Añade imagenUrl solo si el usuario la ingresó
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
        this.noticiaImagenUrl = '' // <-- Limpiar también la URL
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
