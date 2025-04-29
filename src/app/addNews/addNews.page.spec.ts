import { ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'

import { AddNewsPage } from './addNews.page'

describe('AddNewsPage', () => {
    let component: AddNewsPage
    let fixture: ComponentFixture<AddNewsPage>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddNewsPage],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
        }).compileComponents()

        fixture = TestBed.createComponent(AddNewsPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
