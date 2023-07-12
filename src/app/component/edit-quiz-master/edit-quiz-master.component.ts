import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-edit-quiz-master',
  templateUrl: './edit-quiz-master.component.html',
  styleUrls: ['./edit-quiz-master.component.css']
})
export class EditQuizMasterComponent implements OnInit {

  quizMasterId;
  quizMasterDetails = {
    name:'',
    quizMasterImage:'',
    email:'',
    quizMaster:0,
    duration:-1,
    noOfQuiz:0,
    expirationTimestamp:""
  };

  mediaFile;
  
  constructor(private route:ActivatedRoute,private routerBtn:Router,private quizMasterService:QuizMasterService,private toast:ToastrService) { 
    this.route.params.subscribe(Params=>{
      this.quizMasterId = Params['quizMasterId'];

      this.quizMasterService.getParticularQuizMaster(this.quizMasterId).subscribe(res=>{
        this.quizMasterDetails = res['quizMaster'];
        res['quizMaster'].expirationTimestamp = res['quizMaster'].expirationTimestamp.split('T')[0];
        console.log(this.quizMasterDetails);
      });
    });
  }

  ngOnInit(): void {
   
  }

  selectImage(event)
{
  const file = event.target.files[0];
  this.mediaFile = file;
  console.log("Media File : ",this.mediaFile);
  
  const formData = new FormData();   
  formData.append('quizMasterId',this.quizMasterId);
  formData.append('profilePic',this.mediaFile);

  this.quizMasterService.editQuizMasterImage(formData).subscribe(res=>{
    if(res["status"])
    {
      this.quizMasterDetails.quizMasterImage = res["quizMaster"].quizMasterImage;    
      console.log("QuizMasterImage : ",this.quizMasterDetails.quizMasterImage);  
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


 editQuestion(form:NgForm)
 {
   form.value.quizMasterImage = this.quizMasterDetails.quizMasterImage;
    console.log(form.value);
    this.quizMasterService.editQuizMasterAllDetails(form.value).subscribe(res=>{
      if(res["status"])
      {
        this.toast.success(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
        this.routerBtn.navigate(['/main-content']);
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

}
