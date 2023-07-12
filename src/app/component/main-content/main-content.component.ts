import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  quizMasters:any = [];
  query = '';
  isLoading = true;
  showPublicList = 1;

  constructor(private quizMasterService: QuizMasterService,
        private router: Router
    ) { }

  ngOnInit(): void {
    this.getQuizMasters(1);
  }

  // ngAfterViewInit(): void {
  //   this.getQuizMasters();
  // }

  getQuizMasters(isPublic) {
    var filteredList = [];
    this.quizMasterService.getAllQuizMasters().subscribe(res => {
      res['quizMasters'].forEach(master=>{
        if(master.email.length>=24)
          {
            master.email = master.email.substring(0,24)+'...';
          }

          if(master.quizMaster==+isPublic)
          {
            filteredList.push(master);
          }
      })
      // this.quizMasters = res['quizMasters'];
      this.quizMasters = filteredList;
      this.hideloader();
      console.log("Quiz Masters : ", this.quizMasters);
    })
  }

  toggleMasterList(newVal)
  {
    this.showPublicList = newVal;
    console.log(this.showPublicList);
    this.getQuizMasters(+this.showPublicList);
  }

  hideloader() {  
    console.log("Stop Loading");
    this.isLoading = false;
  }

}
