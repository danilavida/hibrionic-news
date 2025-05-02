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
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone'

@Component({
    selector: 'app-addNews',
    templateUrl: 'addNews.page.html',
    styleUrls: ['addNews.page.scss'],
    standalone: true,
    imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, 
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
        IonIcon
    ]
})
export class AddNewsPage {
    noticiaTitulo: string = ''
    noticiaFecha: string = ''
    noticiaDescripcion: string = ''

    isDatePickerOpen = false

    constructor() {}

    agregarNoticia() {
        if (!this.noticiaTitulo || !this.noticiaFecha || !this.noticiaDescripcion) {
            console.error('Todos los campos son requeridos')
            alert('Por favor, completa todos los campos.')
            return
        }

        console.log('Datos de la nueva noticia:')
        console.log('Título:', this.noticiaTitulo)
        console.log('Fecha:', this.noticiaFecha)
        console.log('Descripción:', this.noticiaDescripcion)

        this.noticiaTitulo = ''
        this.noticiaFecha = ''
        this.noticiaDescripcion = ''

        alert('Noticia agregada (simulado).')
    }

    handleDateChange(event: any) {
        this.noticiaFecha = event.detail.value
        console.log('Fecha seleccionada (ISO String):', this.noticiaFecha)
    }

    setOpen(isOpen: boolean) {
        this.isDatePickerOpen = isOpen
    }
}
