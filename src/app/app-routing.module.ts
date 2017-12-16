import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GenresUserComponent } from './components/genres/genres.component';
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

const routes: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
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
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
