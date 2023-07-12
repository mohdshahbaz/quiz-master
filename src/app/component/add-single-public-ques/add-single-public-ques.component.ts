import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PublicQuestionsService } from 'src/app/services/public-questions.service';

@Component({
  selector: 'app-add-single-public-ques',
  templateUrl: './add-single-public-ques.component.html',
  styleUrls: ['./add-single-public-ques.component.css']
})
export class AddSinglePublicQuesComponent implements OnInit {

  defaultOption = 0;
  questionsArr = [];
  options = [];

  totalQues;
  currQues;
  isSaveQuesMode = true;
  updateMode = false;

  mediaFile;
  questionImgUrl="";

  totalQuesArr = [];
  questionsIds = [];

  quizCategory="";
  quizSubCategory = "";
  quizAreaOfInterest = "";

  btnText = [];

  constructor(private toast:ToastrService,private publicQuestionsService:PublicQuestionsService,
              private routerBtn:Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.totalQues = +JSON.parse(sessionStorage.getItem('questionDetails')).noOfQuestions;
    this.quizCategory = JSON.parse(sessionStorage.getItem('questionDetails')).quizCategory;
    this.quizSubCategory = JSON.parse(sessionStorage.getItem('questionDetails')).quizSubCategory;
    this.quizAreaOfInterest = JSON.parse(sessionStorage.getItem('questionDetails')).areaOfInterest;
    console.log(this.totalQues,this.quizCategory,this.quizSubCategory,this.quizAreaOfInterest);

    for(var i=0;i<this.totalQues;i++)
    {
      this.totalQuesArr.push(i+1);
      this.btnText.push("Save Question");
    }
    // this.userFreeQuizService.totalQuestions.subscribe(res=>{
    //   this.totalQues = res;
    //   for(var i=0;i<this.totalQues;i++)
    //   {
    //     this.totalQuesArr.push(i+1);
    //   }
    // });
    
    this.publicQuestionsService.currentQues.subscribe(res1=>{
      this.currQues = res1;
    });

    var randomNum = this.generateRandomString(4);
    console.log(randomNum);

    if(localStorage.getItem('allQuestions')!=null)
    {
      this.questionsArr = JSON.parse(localStorage.getItem('allQuestions'));
      console.log(this.questionsArr);
      this.updateMode = true;
      this.isSaveQuesMode = false;

      if(this.questionsArr.length < this.totalQues)
      {
        for(var i = 0;i<(this.totalQues-this.questionsArr.length);i++)
        {
          var questionId = this.generateRandomString(4);
          this.questionsArr.push({questionId:questionId,quesText:"",options:["","","",""],solution:"",rightOption:""});
        }
      }

      if(this.questionsArr.length > this.totalQues)
      {
        for(var i = 0;i<(this.questionsArr.length-this.totalQues);i++)
        {
          this.questionsArr.splice(-1,1);
        }
      }
    }
  }

  generateRandomString(length) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  }

selectImage(event)
{
  const file = event.target.files[0];
  this.mediaFile = file;
  console.log("Media File : ",this.mediaFile);
  
  const formData = new FormData();   
  formData.append('questionImage',this.mediaFile);

  this.publicQuestionsService.addQuestionImage(formData).subscribe(res=>{
    if(res["status"])
    {
      this.questionImgUrl = res["imageUrl"];      
    }      
    else{
    this.toast.error("Media File not uploaded successfully","Error",{
      timeOut:2500,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-top-right'
    })
    }
  
  },
  err=>{
    console.log(err);
    this.toast.error("Media File not uploaded successfully","Error",{
      timeOut:2500,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-top-right'
    })
  });
 }

 updateQues(index)
 {
   console.log(this.questionsArr[index]);
 }

addQuestion(form:NgForm,newIndex)
{
  console.log(newIndex);
  var duplicateQues = false;
  this.spinner.show();
  if(this.isSaveQuesMode)
  {
    console.log(form.value);
    this.options.push(form.value.option1);
    this.options.push(form.value.option2);
    this.options.push(form.value.option3);
    this.options.push(form.value.option4);
    
    var quesData = {
      quizMasterId:+JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'],
      quesText:form.value.quesText,
      options:this.options,
      quesImgUrl:this.questionImgUrl,
      solution:form.value.solution,
      rightOption:form.value.rightOption,
      quizCategory:this.quizCategory,
      quizSubCategory:this.quizSubCategory,
      areaOfInterest:this.quizAreaOfInterest
    };

    console.log("Question Data : ", quesData);
      
    console.log(this.questionsArr,quesData);
    // const index = this.questionsArr.findIndex(f=>f.quesText==quesData.quesText);
      // debugger;
    if(this.questionsArr[newIndex]!=undefined && this.questionsArr[newIndex].quesText.length>0)
    {
      duplicateQues = true;
    }

    if(duplicateQues)
    {
      // console.log(quesData);
      // this.toast.error("Duplicate Question Not Allowed","Error",{
      //   timeOut:2500,
      //   progressBar:true,
      //   progressAnimation:'increasing',
      //   positionClass:'toast-top-right'
      // });
      // this.spinner.hide();
      var editData = {...quesData,questionId:this.questionsIds[newIndex]};
      console.log(editData);
      this.publicQuestionsService.editSingleQuestion(editData).subscribe(editRes=>{
        if(editRes["status"])
        {
          this.spinner.hide();
          this.toast.success(editRes["message"],"Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        }
        else{
          this.spinner.hide();
          this.toast.error(editRes["message"],"Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        }
      });
      this.options = [];
      this.questionImgUrl = "";
    }
    else{      
      console.log("Non-Duplicate Question");
      // this.spinner.hide(); 
      this.questionsArr.push(quesData);
      console.log(quesData);
      console.log("Length : ",this.questionsArr.length);
      // form.reset();
      this.options = [];
      this.questionImgUrl = "";
      console.log(this.currQues,this.totalQuesArr.length);
        if(this.currQues!=this.totalQuesArr.length)
        {
          console.log("Curr Ques :",this.currQues);
          this.currQues = this.currQues + 1;
          var newQuesArr = this.questionsArr;
          var lastItem = newQuesArr[newQuesArr.length - 1];
          console.log(lastItem);
          this.publicQuestionsService.addQuizMasterQuestions(lastItem).subscribe(res=>{
            console.log(res);
            if(res["status"])
            {
              this.btnText[newIndex] = "Update";
              this.questionsIds.push(res["quizMasterQues"].questions[res["quizMasterQues"].questions.length-1].questionId);
              console.log("Questions IDs : ",this.questionsIds);
              this.toast.success("Questions Saved to Database","Success",{
                timeOut:2500,
                progressBar:true,
                progressAnimation:'increasing',
                positionClass:'toast-top-right'
              });              
              this.spinner.hide();
            }           
         })
          this.publicQuestionsService.currentQues.next(this.currQues);
        }
        else{
          // this.isSaveQuesMode = false;
          console.log("Last Question");        
          console.log("Array : ", this.questionsArr);
          // localStorage.setItem("allQuestions",JSON.stringify(this.questionsArr));

          var newQuesArr = this.questionsArr;
          var lastItem = newQuesArr[newQuesArr.length - 1];
          console.log(lastItem);
          this.publicQuestionsService.addQuizMasterQuestions(lastItem).subscribe(res=>{
            console.log(res);
            if(res["status"])
            {
              this.toast.success("Questions Saved to Database","Success",{
                timeOut:2500,
                progressBar:true,
                progressAnimation:'increasing',
                positionClass:'toast-top-right'
              });              
              this.spinner.hide();
              this.routerBtn.navigate(['/all-master-questions']);
            }           
         })
        }   
      }
    }
    
    if(this.updateMode)
    {
      console.log("Update Mode");
      console.log(this.questionsArr);
      localStorage.setItem("allQuestions",JSON.stringify(this.questionsArr));
      // this.userFreeQuizService.allQuestionsArr.next(this.questionsArr);
      this.spinner.hide();
      // this.location.back();
    }    
  }

  saveAllQuestions()
  {
    localStorage.setItem("allQuestions",JSON.stringify(this.questionsArr));
    // this.userFreeQuizService.allQuestionsArr.next(this.questionsArr);
    // this.routerBtn.navigate(['/']);
    // this.location.back();
  }

}
