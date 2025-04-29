import { Component } from '@angular/core'
// Importa la interfaz Noticia desde tu archivo de modelos
import { Noticia } from '../models/noticia.model'
// Importar CommonModule para *ngIf y *ngFor
import { CommonModule } from '@angular/common'
// Importar los componentes de Ionic necesarios de forma individual
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
    IonIcon
} from '@ionic/angular/standalone'

@Component({
    selector: 'app-news', // Asegúrate que este selector coincide
    templateUrl: 'news.page.html',
    styleUrls: ['news.page.scss'],
    standalone: true, // Esto indica que el componente es independiente
    // Añadir imports para las dependencias del template
    imports: [
        CommonModule, // Para *ngIf, *ngFor, etc.
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
export class NewsPage {
    // Array para guardar las noticias (con datos de ejemplo)
    // Asegúrate que la ruta a la imagen sea válida en tu proyecto o usa una URL externa
    noticias: Noticia[] = [
        {
            id: '1', // Agregamos IDs de ejemplo
            titulo: 'Primera Noticia Importante',
            fecha: '2025-04-28', // Fecha de ejemplo
            descripcion:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            imagenUrl:
                'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1196/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58'
        },
        {
            id: '2',
            titulo: 'Actualización del Clima Local',
            fecha: '2025-04-27',
            descripcion:
                'Se esperan cielos despejados para Matamoros durante el resto de la semana.',
            imagenUrl:
                'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1196/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58'
        },
        {
            id: '3',
            titulo: 'Avances en Tecnología Móvil',
            fecha: '2025-04-26',
            descripcion:
                'Nuevas características anunciadas para la próxima generación de dispositivos.',
            imagenUrl:
                'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1196/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58'
        }
    ]

    constructor() {}

    // Método para eliminar la noticia (lógica de Firebase vendrá después)
    eliminarNoticia(noticiaParaEliminar: Noticia) {
        console.log('Intentando eliminar noticia:', noticiaParaEliminar)
        // Aquí, más adelante, llamarás al servicio que interactúa con Firebase
        // Por ahora, podríamos simular la eliminación del array local:
        // this.noticias = this.noticias.filter(noticia => noticia.id !== noticiaParaEliminar.id);
        alert(`Noticia "${noticiaParaEliminar.titulo}" marcada para eliminar.`) // Feedback visual temporal
    }
}
