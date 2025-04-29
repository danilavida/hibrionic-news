import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'news',
                loadChildren: () =>
                    import('../news/news.module').then((m) => m.NewsPageModule)
            },
            {
                path: 'addNews',
                loadChildren: () =>
                    import('../addNews/addNews.module').then((m) => m.AddNewsPageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/news',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/news',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
