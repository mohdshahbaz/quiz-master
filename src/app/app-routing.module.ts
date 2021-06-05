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

const routes: Routes = [
  {
    path: 'add-quiz-master',
    component: AddQuizMasterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main-content',
    component: MainContentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-new-quiz',
    component: AddNewQuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-new-group',
    component: CreateNewGroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-users',
    component: AllUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-organization-quiz',
    component: AddOrganizationQuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nonSelected-requests',
    component: NonSelectedRequestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'selected-requests',
    component: SelectedRequestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-quizzes/:quizMasterId',
    component: ShowAllQuizzesComponent,
    canActivate: [AuthGuard]
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
    path: 'login',
    component: LoginComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
