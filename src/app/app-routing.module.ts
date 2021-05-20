import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './component/add-quiz/add-quiz.component';
import { MainContentComponent } from './component/main-content/main-content.component';

const routes: Routes = [
  
  {
    path: 'add-quiz',
    component: AddQuizComponent
  },

  {
    path: 'main-content',
    component: MainContentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
