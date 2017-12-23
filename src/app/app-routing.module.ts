import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GenresUserComponent } from './components/genres/genres.component';
import { NewsUserComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { VisitorLayoutComponent } from './components/layouts/visitor-layout/visitor-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { NewsComponent } from './components/admin/news/news.component';
import { WorksComponent } from './components/admin/works/works.component';
import { GenresComponent } from './components/admin/genres/genres.component';
import { CreatorsComponent } from './components/admin/creators/creators.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { ContactComponent } from './components/contact/contact.component';
import { NewsSingleComponent } from './components/news-single/news-single.component';
import { RequestsBuyComponent } from './components/admin/requests-buy/requests-buy.component';
import { RequestsContactComponent } from './components/admin/requests-contact/requests-contact.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      {
        path: '',
        component: NewsUserComponent,
        pathMatch: 'full'
      },
      {
        path: 'news/:link',
        component: NewsSingleComponent,
        data: { page: 'newsSingle' }
      },
      {
        path: 'genres',
        component: GenresUserComponent,
        data: { page: 'genres' }
      },
      {
        path: 'genres/:genre',
        component: GenresUserComponent,
        data: { page: 'genresSpecific' }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { page: 'about' }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { page: 'contact' }
      },
      {
        path: 'works',
        component: HomeComponent,
        data: { page: 'home' }
      },
      {
        path: 'works/:alias',
        component: WorkComponent,
        data: { page: 'work' }
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'works',
        component: WorksComponent
      },
      {
        path: 'genres',
        component: GenresComponent
      },
      {
        path: 'creators',
        component: CreatorsComponent
      },
      {
        path: 'buy-requests',
        component: RequestsBuyComponent
      },
      {
        path: 'contact-requests',
        component: RequestsContactComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
  { path: '**', component: NewsUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
