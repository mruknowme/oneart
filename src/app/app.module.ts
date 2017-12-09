import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { VisitorLayoutComponent } from './components/layouts/visitor-layout/visitor-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';

import { MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatSelectModule,
} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

import { ToolbarComponent } from './components/admin/toolbar/toolbar.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { WorksComponent } from './components/admin/works/works.component';
import { WorkAddComponent } from './components/admin/work-add/work-add.component';
import { CreatorsComponent } from './components/admin/creators/creators.component';
import { CreatorsAddComponent } from './components/admin/creators-add/creators-add.component';
import { CreatorsEditComponent } from './components/admin/creators-edit/creators-edit.component';
import { GenresComponent } from './components/admin/genres/genres.component';
import { GenresAddComponent } from './components/admin/genres-add/genres-add.component';

import { DataService } from './services/admin/data.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AboutComponent,
    WorkComponent,
    DashboardComponent,
    VisitorLayoutComponent,
    AdminLayoutComponent,
    ToolbarComponent,
    SidenavComponent,
    WorksComponent,
    WorkAddComponent,
    CreatorsComponent,
    CreatorsAddComponent,
    GenresComponent,
    GenresAddComponent,
    CreatorsEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  entryComponents: [WorkAddComponent, CreatorsAddComponent, CreatorsEditComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
