import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StudentGroupService } from 'src/app/services/student-group.service';

@Component({
  selector: 'app-edit-student-group',
  templateUrl: './edit-student-group.component.html',
  styleUrls: ['./edit-student-group.component.css']
})
export class EditStudentGroupComponent implements OnInit {

  groupId;
  studentsInGroup = [];
  studentIds = [];
  allUsers = [];

  searchIdentity = '';
  filteredStudent;
  showFilteredStudent = false;

  remainingUsers = [];  //difference between allUsers and studentsInGroup

  constructor(private studentGroupService:StudentGroupService,private route:ActivatedRoute,private toast:ToastrService,
              private routerBtn:Router,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(Params=>{
      this.groupId = Params['groupId'];
      console.log("GroupID : ",this.groupId);

      this.studentGroupService.getSingleGroupDetails(+this.groupId).subscribe(res=>{
        this.studentsInGroup = res["studentGroup"].students;
        console.log("Students In GROUP : ",this.studentsInGroup);

        this.studentGroupService.getAllUsers().subscribe(resUsers=>{
          this.allUsers = resUsers["users"];
          console.log("All Users : ",this.allUsers);
          this.allUsers.forEach(user=>{
            //if user is not is not is studentsInGroupArray
            const index = this.studentsInGroup.findIndex(f=>f.userId==user.userId);
            if(index==-1)
            {
              this.remainingUsers.push(user);
            }
          })
          console.log("Remaining Users : ", this.remainingUsers);
    
        });

      });
    });
    
    setTimeout(()=>{
      
    // console.log("Remaining Users : ", this.remainingUsers);
    },3000);

  }

  searchSingleStudent()
  {
    if(this.searchIdentity!="")
    {      
    this.remainingUsers.forEach(singleStudent=>{
      if(singleStudent.email==this.searchIdentity)
      {
        this.filteredStudent = singleStudent;
        this.showFilteredStudent = true;
      }

      if(singleStudent.phone!=undefined || singleStudent.phone!="NA" || singleStudent.phone!="" || singleStudent.phone!=null)
      {
        if(singleStudent.phone==(+this.searchIdentity))
        {
          this.filteredStudent = singleStudent;
          this.showFilteredStudent = true;
        }
      }      
    });
   }
   else{
     this.showFilteredStudent = false;
   }

  }


  removeStudent(userId,userObj)
  {
    this.remainingUsers.push(userObj);
    //removing from studentsInGroup array
    const index = this.studentsInGroup.findIndex(f=>f.userId==(+userId));
    if(index!=-1)
    {
      this.studentsInGroup.splice(index,1);
    }
  }

  addStudent(userId,userObj)
  {
    this.studentsInGroup.push(userObj);
    //removing from remainingUsers array
    const index = this.remainingUsers.findIndex(f=>f.userId==(+userId));
    if(index!=-1)
    {
      this.remainingUsers.splice(index,1);
    }
    this.showFilteredStudent = false;
  }

  submitEditedGroup()
  {
    this.spinnerService.show();
    console.log("Final Group : ", this.studentsInGroup);
    this.studentsInGroup.forEach(grp=>{
      this.studentIds.push(grp.userId);
    });
    setTimeout(()=>{
      this.studentGroupService.editStudentsGroup({groupId:this.groupId,students:this.studentIds}).subscribe(res=>{
        if(res["status"])
        {
          this.spinnerService.hide();
          this.toast.success(res["message"],"Success",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
          this.routerBtn.navigate(['/create-new-group']);
        }      
        else{
          this.spinnerService.hide();
        this.toast.error(res["message"],"Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
        }    
      },
      err=>{
        this.spinnerService.hide();
        console.log(err);
        this.toast.error("Unknown error occured","Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      });
  
    },1000);
  }

}
