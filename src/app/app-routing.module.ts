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

const routes: Routes = [
  {
    path: 'add-quiz-master',
    component: AddQuizMasterComponent
  },
  {
    path: 'main-content',
    component: MainContentComponent
  },
  {
    path: 'add-new-quiz',
    component: AddNewQuizComponent
  },
  {
    path: 'create-new-group',
    component: CreateNewGroupComponent
  },
  {
    path: 'all-users',
    component: AllUsersComponent
  },
  {
    path: 'add-organization-quiz',
    component: AddOrganizationQuizComponent
  },
  {
    path: 'nonSelected-requests',
    component: NonSelectedRequestsComponent
  },
  {
    path: 'selected-requests',
    component: SelectedRequestsComponent
  },
  {
    path: 'all-quizzes/:quizMasterId',
    component: ShowAllQuizzesComponent
  },
  {
    path: 'edit-public-quiz/:quizId',
    component: EditPublicQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
