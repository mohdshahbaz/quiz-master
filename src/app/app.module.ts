import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MainContentComponent } from './component/main-content/main-content.component';
import { AddQuizMasterComponent } from './component/add-quiz-master/add-quiz-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from './component/main-nav/main-nav.component';
import { AddNewQuizComponent } from './component/add-new-quiz/add-new-quiz.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SelectAgeDialogComponent } from './component/select-age-dialog/select-age-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestCategoryDialogComponent } from './component/request-category-dialog/request-category-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddQuestionsDialogComponent } from './component/add-questions-dialog/add-questions-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { CreateNewGroupComponent } from './component/create-new-group/create-new-group.component';
import { AllUsersComponent } from './component/all-users/all-users.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    AddQuizMasterComponent,
    MainNavComponent,
    AddNewQuizComponent,
    SelectAgeDialogComponent,
    RequestCategoryDialogComponent,
    AddQuestionsDialogComponent,
    CreateNewGroupComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    LayoutModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
