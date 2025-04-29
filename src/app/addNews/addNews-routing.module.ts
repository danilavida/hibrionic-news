import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddNewsPage } from './addNews.page'

const routes: Routes = [
    {
        path: '',
        component: AddNewsPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddNewsRoutingModule {}
