import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DragScrollModule } from 'ngx-drag-scroll';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { environment } from '../environments/environment';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu, 'ru');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { GenresUserComponent } from './components/genres/genres.component';
import { NewsUserComponent } from './components/news/news.component';
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
  MatSnackBarModule,
  MatSlideToggleModule,
  MatCardModule,
  MatNativeDateModule,
  MatDatepickerModule,
  DateAdapter,
  MAT_DATE_FORMATS
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
import { CreatorsDeleteComponent } from './components/admin/creators-delete/creators-delete.component';
import { GenresComponent } from './components/admin/genres/genres.component';
import { GenresAddComponent } from './components/admin/genres-add/genres-add.component';
import { WorksDeleteComponent } from './components/admin/works-delete/works-delete.component';
import { WorksEditComponent } from './components/admin/works-edit/works-edit.component';
import { GenresDeleteComponent } from './components/admin/genres-delete/genres-delete.component';
import { GenresEditComponent } from './components/admin/genres-edit/genres-edit.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { ContactComponent } from './components/contact/contact.component';
import { NewsComponent } from './components/admin/news/news.component';
import { NewsAddComponent } from './components/admin/news-add/news-add.component';
import { NewsDeleteComponent } from './components/admin/news-delete/news-delete.component';
import { NewsEditComponent } from './components/admin/news-edit/news-edit.component';

import { DataService } from './services/admin/data.service';

import { AppDateAdapter, APP_DATE_FORMATS } from './adapters/date.adapter';
import { NewsSingleComponent } from './components/news-single/news-single.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { OnlyNumbersPipe } from './pipes/only-numbers.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AboutComponent,
    GenresUserComponent,
    NewsUserComponent,
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
    CreatorsEditComponent,
    CreatorsDeleteComponent,
    WorksDeleteComponent,
    WorksEditComponent,
    GenresDeleteComponent,
    GenresEditComponent,
    SettingsComponent,
    ContactComponent,
    NewsComponent,
    NewsAddComponent,
    NewsDeleteComponent,
    NewsEditComponent,
    NewsSingleComponent,
    SafeHtmlPipe,
    OnlyNumbersPipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragScrollModule,
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
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  entryComponents: [
    NewsAddComponent, NewsEditComponent, NewsDeleteComponent,
    WorkAddComponent, WorksEditComponent, WorksDeleteComponent,
    CreatorsAddComponent, CreatorsEditComponent, CreatorsDeleteComponent,
    GenresAddComponent, GenresEditComponent, GenresDeleteComponent
  ],
  providers: [ DataService, { provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
