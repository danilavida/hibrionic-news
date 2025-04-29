import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AddNewsPage } from './addNews.page'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'

import { AddNewsRoutingModule } from './addNews-routing.module'

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        AddNewsRoutingModule
    ],
    declarations: [AddNewsPage]
})
export class AddNewsPageModule {}
