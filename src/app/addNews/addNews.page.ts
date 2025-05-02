import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
// Importa TODOS los componentes Ionic usados en el HTML desde /standalone
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
    // --- NUEVO: Importa los componentes de Card ---
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    // --- Controladores (ya estaban bien importados aquí) ---
    LoadingController,
    AlertController
} from '@ionic/angular/standalone' // O desde '@ionic/angular'

// Importa el servicio
import { NoticiasService } from '../services/noticias.service'

@Component({
    selector: 'app-addNews',
    templateUrl: 'addNews.page.html',
    styleUrls: ['addNews.page.scss'],
    standalone: true, // Es Standalone
    imports: [
        // Array de imports para el TEMPLATE HTML
        FormsModule,
        CommonModule,
        // Componentes Ionic Standalone usados en el template:
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
        // --- NUEVO: Añade los componentes de Card aquí también ---
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent
    ]
})
export class AddNewsPage {
    // --- Propiedades ---
    noticiaTitulo: string = ''
    noticiaFecha: string = ''
    noticiaDescripcion: string = ''
    isDatePickerOpen = false

    // --- Constructor con Inyección de Dependencias ---
    constructor(
        private noticiasService: NoticiasService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {}

    // --- Métodos ---
    async agregarNoticia() {
        if (!this.noticiaTitulo || !this.noticiaFecha || !this.noticiaDescripcion) {
            this.mostrarAlerta('Error', 'Por favor, completa todos los campos.')
            return
        }

        const loading = await this.loadingCtrl.create({ message: 'Guardando noticia...' })
        await loading.present()

        const nuevaNoticia = {
            titulo: this.noticiaTitulo,
            fecha: this.noticiaFecha,
            descripcion: this.noticiaDescripcion
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
        console.log('Fecha seleccionada (ISO String):', this.noticiaFecha)
    }

    setOpen(isOpen: boolean) {
        this.isDatePickerOpen = isOpen
    }
}
