import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {ChartsModule} from 'ng2-charts';
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
import { DataTablesModule } from "angular-datatables";
import { UsernameFilterPipe } from './pipes/username-filter.pipe';
import { EmailFilterPipe } from './pipes/email-filter.pipe';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AddOrganizationQuizComponent } from './component/add-organization-quiz/add-organization-quiz.component';
import { SelectGroupDialogComponent } from './component/select-group-dialog/select-group-dialog.component';
import { NonSelectedRequestsComponent } from './component/non-selected-requests/non-selected-requests.component';
import { SelectedRequestsComponent } from './component/selected-requests/selected-requests.component';
import { ShowAllQuizzesComponent } from './component/show-all-quizzes/show-all-quizzes.component';
import { EditPublicQuizComponent } from './component/edit-public-quiz/edit-public-quiz.component';
import { DatePipe } from '@angular/common';
import { EditAssignedQuizComponent } from './component/edit-assigned-quiz/edit-assigned-quiz.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './component/login/login.component';
import { AddNewQuestionComponent } from './component/add-new-question/add-new-question.component';
import { NotAuthorizedComponent } from './component/not-authorized/not-authorized.component';
import { EditStudentGroupComponent } from './component/edit-student-group/edit-student-group.component';
import { AllDisputesComponent } from './component/all-disputes/all-disputes.component';
import { DisputeDetailsComponent } from './component/dispute-details/dispute-details.component';
import { AllQuestionsComponent } from './component/all-questions/all-questions.component';
import { NotificationsSuperAdminComponent } from './component/notifications-super-admin/notifications-super-admin.component';
import { NotificationsAssignedQuizMasterComponent } from './component/notifications-assigned-quiz-master/notifications-assigned-quiz-master.component';
import { AllQuestionsQuizMasterComponent } from './component/all-questions-quiz-master/all-questions-quiz-master.component';
import { AllPaymentRequestsComponent } from './component/all-payment-requests/all-payment-requests.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddPublicQuesDetailsComponent } from './component/add-public-ques-details/add-public-ques-details.component';
import { AddSinglePublicQuesComponent } from './component/add-single-public-ques/add-single-public-ques.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditPublicQuestionComponent } from './component/edit-public-question/edit-public-question.component';
import { ShowQuestionDetailsComponent } from './component/show-question-details/show-question-details.component';
import { ShowAllUsersComponent } from './component/show-all-users/show-all-users.component';
import { NameFilterPipe } from './name-filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { ShowQuizMasterDetailsComponent } from './component/show-quiz-master-details/show-quiz-master-details.component';
import { EditQuizMasterComponent } from './component/edit-quiz-master/edit-quiz-master.component';
import { ViewGroupStudentsComponent } from './component/view-group-students/view-group-students.component';
import { AddEditBannerComponent } from './component/add-edit-banner/add-edit-banner.component';
import { StudentPerformanceComponent } from './component/student-performance/student-performance.component';
import { QuizUsersPerformanceComponent } from './component/quiz-users-performance/quiz-users-performance.component';
import { SingleStudentPerformanceComponent } from './component/single-student-performance/single-student-performance.component';
import { PerformanceChartComponent } from './component/performance-chart/performance-chart.component';
import { ShowBannerComponent } from './component/show-banner/show-banner.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { RescheduleAssignedQuizComponent } from './component/reschedule-assigned-quiz/reschedule-assigned-quiz.component';
import { MetricsComponent } from './metrics/metrics.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
//Installed Using : 
// >npm i ngx-spinner@v11.0.2


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
    AllUsersComponent,
    UsernameFilterPipe,
    EmailFilterPipe,
    AddOrganizationQuizComponent,
    SelectGroupDialogComponent,
    NonSelectedRequestsComponent,
    SelectedRequestsComponent,
    ShowAllQuizzesComponent,
    EditPublicQuizComponent,
    EditAssignedQuizComponent,
    LoginComponent,
    AddNewQuestionComponent,
    NotAuthorizedComponent,
    EditStudentGroupComponent,
    AllDisputesComponent,
    DisputeDetailsComponent,
    AllQuestionsComponent,
    NotificationsSuperAdminComponent,
    NotificationsAssignedQuizMasterComponent,
    AllQuestionsQuizMasterComponent,
    AllPaymentRequestsComponent,
    SpinnerComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    AddPublicQuesDetailsComponent,
    AddSinglePublicQuesComponent,
    EditPublicQuestionComponent,
    ShowQuestionDetailsComponent,
    ShowAllUsersComponent,
    NameFilterPipe,
    EditProfileComponent,
    ShowQuizMasterDetailsComponent,
    EditQuizMasterComponent,
    ViewGroupStudentsComponent,
    AddEditBannerComponent,
    StudentPerformanceComponent,
    QuizUsersPerformanceComponent,
    SingleStudentPerformanceComponent,
    PerformanceChartComponent,
    ShowBannerComponent,
    EditUserComponent,
    RescheduleAssignedQuizComponent,
    MetricsComponent,
    AllTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    ChartsModule,
    MatSlideToggleModule,
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
    NgxSpinnerModule,
    NgxPaginationModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
    // NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DataTablesModule,
    ShowHidePasswordModule
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
