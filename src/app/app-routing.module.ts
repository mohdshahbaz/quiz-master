import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizMasterComponent } from './component/add-quiz-master/add-quiz-master.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { AddNewQuizComponent } from './component/add-new-quiz/add-new-quiz.component';
import { CreateNewGroupComponent } from './component/create-new-group/create-new-group.component';
import { AllUsersComponent } from './component/all-users/all-users.component';
import { AddOrganizationQuizComponent } from './component/add-organization-quiz/add-organization-quiz.component';
import { NonSelectedRequestsComponent } from './component/non-selected-requests/non-selected-requests.component';
import { SelectedRequestsComponent } from './component/selected-requests/selected-requests.component';
import { ShowAllQuizzesComponent } from './component/show-all-quizzes/show-all-quizzes.component';
import { EditPublicQuizComponent } from './component/edit-public-quiz/edit-public-quiz.component';
import { EditAssignedQuizComponent } from './component/edit-assigned-quiz/edit-assigned-quiz.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './auth.guard';
import { NotAuthorizedComponent } from './component/not-authorized/not-authorized.component';
import { RouteProtectGuard } from './route-protect.guard';
import { AdminRouteProtectGuard } from './admin-route-protect.guard';
import { EditStudentGroupComponent } from './component/edit-student-group/edit-student-group.component';
import { AllDisputesComponent } from './component/all-disputes/all-disputes.component';
import { AllQuestionsComponent } from './component/all-questions/all-questions.component';
import { NotificationsSuperAdminComponent } from './component/notifications-super-admin/notifications-super-admin.component';
import { NotificationsAssignedQuizMasterComponent } from './component/notifications-assigned-quiz-master/notifications-assigned-quiz-master.component';
import { AllQuestionsQuizMasterComponent } from './component/all-questions-quiz-master/all-questions-quiz-master.component';
import { AllPaymentRequestsComponent } from './component/all-payment-requests/all-payment-requests.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddPublicQuesDetailsComponent } from './component/add-public-ques-details/add-public-ques-details.component';
import { AddSinglePublicQuesComponent } from './component/add-single-public-ques/add-single-public-ques.component';
import { EditPublicQuestionComponent } from './component/edit-public-question/edit-public-question.component';
import { RouteProtectOrganizationGuard } from './route-protect-organization.guard';
import { RouteProtectQuizMasterGuard } from './route-protect-quiz-master.guard';
import { ShowAllUsersComponent } from './component/show-all-users/show-all-users.component';
import { ShowQuizMasterDetailsComponent } from './component/show-quiz-master-details/show-quiz-master-details.component';
import { EditQuizMasterComponent } from './component/edit-quiz-master/edit-quiz-master.component';
import { AddEditBannerComponent } from './component/add-edit-banner/add-edit-banner.component';
import { StudentPerformanceComponent } from './component/student-performance/student-performance.component';
import { QuizUsersPerformanceComponent } from './component/quiz-users-performance/quiz-users-performance.component';
import { SingleStudentPerformanceComponent } from './component/single-student-performance/single-student-performance.component';
import { PerformanceChartComponent } from './component/performance-chart/performance-chart.component';
import { ShowBannerComponent } from './component/show-banner/show-banner.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { RescheduleAssignedQuizComponent } from './component/reschedule-assigned-quiz/reschedule-assigned-quiz.component';
import { MetricsComponent } from './metrics/metrics.component';


const routes: Routes = [
  {
    path: 'add-quiz-master',
    component: AddQuizMasterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'show-profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main-content',
    component: MainContentComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'master-details/:quizMasterId',
    component: ShowQuizMasterDetailsComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'edit-master-details/:quizMasterId',
    component: EditQuizMasterComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'show-all-users',
    component: ShowAllUsersComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path:'edit-single-user/:userId',
    component: EditUserComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'add-new-quiz',
    component: AddNewQuizComponent,
    canActivate: [AuthGuard,RouteProtectGuard]
  },
  {
    path: 'create-new-group',
    component: CreateNewGroupComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'all-group-notifications',
    component: NotificationsAssignedQuizMasterComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'all-master-questions',
    component: AllQuestionsQuizMasterComponent,
    canActivate: [AuthGuard,RouteProtectQuizMasterGuard]
  },
  {
    path: 'add-question-details',
    component: AddPublicQuesDetailsComponent,
    canActivate: [AuthGuard,RouteProtectQuizMasterGuard]
  },
  {
    path: 'add-single-question',
    component: AddSinglePublicQuesComponent,
    canActivate: [AuthGuard,RouteProtectQuizMasterGuard]
  },
  {
    path: 'edit-single-question/:questionId',
    component: EditPublicQuestionComponent,
    canActivate: [AuthGuard,RouteProtectQuizMasterGuard]
  },
  {
    path: 'edit-students-group/:groupId',
    component: EditStudentGroupComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'all-users',
    component: AllUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-organization-quiz',
    component: AddOrganizationQuizComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'metrics',
    component: MetricsComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'all-students-performances',
    component: StudentPerformanceComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'single-student-performances/:userId',
    component: SingleStudentPerformanceComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'student-performance-chart/:userId',
    component: PerformanceChartComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'quiz-users-performance/:quizId',
    component: QuizUsersPerformanceComponent,
    canActivate: [AuthGuard,RouteProtectOrganizationGuard]
  },
  {
    path: 'nonSelected-requests',
    component: NonSelectedRequestsComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'edit-banner/:bannerId',
    component: AddEditBannerComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'all-banner',
    component: ShowBannerComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'all-disputes',
    component: AllDisputesComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'all-questions',
    component: AllQuestionsComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'all-payment-requests',
    component: AllPaymentRequestsComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'all-users-notifications',
    component: NotificationsSuperAdminComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'selected-requests',
    component: SelectedRequestsComponent,
    canActivate: [AuthGuard,AdminRouteProtectGuard]
  },
  {
    path: 'all-quizzes/:quizMasterId',
    component: ShowAllQuizzesComponent,
    canActivate: [AuthGuard,RouteProtectQuizMasterGuard]
  },
  {
    path: 'edit-public-quiz/:quizId',
    component: EditPublicQuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-assigned-quiz/:quizId',
    component: EditAssignedQuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reschedule-assigned-quiz/:quizId',
    component: RescheduleAssignedQuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
