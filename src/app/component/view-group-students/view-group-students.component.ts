import { Component, Inject, OnInit, Optional } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-group-students',
  templateUrl: './view-group-students.component.html',
  styleUrls: ['./view-group-students.component.css']
})
export class ViewGroupStudentsComponent implements OnInit {

  students = [];
  filteredStatus='';
  reverse:boolean = false;
  sortAllow;

  p:number =1;

  constructor(public dialogRef:MatDialogRef<ViewGroupStudentsComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    data.students.forEach(stud=>{
      if(stud.phone==null || stud.phone==undefined || stud.phone.toString().length==0 || (+stud.phone)==0)
      {
        stud.phone = "NA";
      }

      if(stud.email==null || stud.email==undefined || stud.email.toString().length==0)
      {
        stud.email = "NA";
      }
    })
    this.students = data.students;
    console.log(this.students);
  }

  ngOnInit(): void {
  }

}
