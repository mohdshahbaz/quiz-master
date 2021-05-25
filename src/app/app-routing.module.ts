import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './component/add-quiz/add-quiz.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { AddNewQuizComponent } from './component/add-new-quiz/add-new-quiz.component';

const routes: Routes = [
  {
    path: 'add-quiz',
    component: AddQuizComponent
  },
  {
    path: 'main-content',
    component: MainContentComponent
  },
  {
    path: 'add-new-quiz',
    component: AddNewQuizComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
