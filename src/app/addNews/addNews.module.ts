import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { AddNewsRoutingModule } from './addNews-routing.module'

@NgModule({
    imports: [IonicModule, CommonModule, FormsModule, AddNewsRoutingModule],
    declarations: []
})
export class AddNewsPageModule {}
