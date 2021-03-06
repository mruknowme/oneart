import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
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
import { SignInComponent } from './components/admin/sign-in/sign-in.component';
import { UploadComponent } from './components/admin/upload/upload.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { MaintenanceGuard } from './guards/maintenance.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      {
        path: '',
        component: NewsUserComponent,
        pathMatch: 'full',
        canActivate: [MaintenanceGuard]
      },
      {
        path: 'news/:link',
        component: NewsSingleComponent,
        data: { page: 'newsSingle' },
        canActivate: [MaintenanceGuard]
      },
      {
        path: 'genres',
        component: GenresUserComponent,
        data: { page: 'genres' },
        canActivate: [MaintenanceGuard]
      },
      {
        path: 'genres/:genre',
        component: GenresUserComponent,
        data: { page: 'genresSpecific' },
        canActivate: [MaintenanceGuard]
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { page: 'about' },
        canActivate: [MaintenanceGuard]
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { page: 'contact' },
        canActivate: [MaintenanceGuard]
      },
      {
        path: 'works',
        component: HomeComponent,
        data: { page: 'home' },
        canActivate: [MaintenanceGuard]
      },
      {
        path: 'works/:alias',
        component: WorkComponent,
        data: { page: 'work' },
        canActivate: [MaintenanceGuard]
      }
    ]
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { page: 'maintenance' }
  },
  {
    path: 'admin/sign-in',
    component: SignInComponent,
    data: { page: 'signIn' },
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'news',
        component: NewsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'works',
        component: WorksComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'genres',
        component: GenresComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'creators',
        component: CreatorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'buy-requests',
        component: RequestsBuyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contact-requests',
        component: RequestsContactComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'upload',
        component: UploadComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: NewsUserComponent,
        canActivate: [MaintenanceGuard]
      }
    ]
  },
  { path: '**', component: NotFoundComponent, canActivate: [MaintenanceGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
