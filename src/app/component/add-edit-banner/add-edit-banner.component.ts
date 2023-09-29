import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-add-edit-banner',
  templateUrl: './add-edit-banner.component.html',
  styleUrls: ['./add-edit-banner.component.css']
})
export class AddEditBannerComponent implements OnInit {

  bannerId;
  bannerDetails;

  bannerImage;
  myBannerImage;
  bannerFileName;

  changedText;

  constructor(private route:ActivatedRoute,private routerBtn:Router,private toast:ToastrService,
    private spinner:NgxSpinnerService,private bannerService:BannerService)
  {
    this.route.params.subscribe(Params=>{
      this.bannerId = Params['bannerId'];
      this.bannerService.getSingleBanner(+this.bannerId).subscribe(res=>{
        this.bannerDetails = res["banner"];
        console.log(this.bannerDetails);
        this.bannerImage = "http://82.180.160.159:8080/api/download/"+this.bannerDetails.bannerImg;
        this.myBannerImage = this.bannerDetails.bannerImg;
      });
    });
  }

  ngOnInit(): void {
    
  }
 
  selectImage(event)
  {
    const file = event.target.files[0];
    console.log(file);
    this.bannerFileName = file.name;

    this.spinner.show();

    const formData = new FormData();
    formData.append("image", file);

    this.bannerService.addSingleImage(formData).subscribe(res=>{
      console.log(res);
      if(res["status"])
      {
        this.toast.success(res["message"]);
         this.bannerImage = "http://82.180.160.159:8080/api/download/"+res["imageUrl"];
         this.myBannerImage = res["imageUrl"];
         this.spinner.hide();
      }
      else
      {
        this.toast.error(res["message"]);
        this.spinner.hide();
      }
    })
       
  }

  onSubmit(form:NgForm)
  {
    var bannerData = {
      bannerId:+this.bannerId,
      bannerURL:form.value.bannerURL,
      bannerImg:this.myBannerImage,
      bannerStatus:this.bannerDetails.bannerStatus
    }

    console.log(bannerData);

    this.bannerService.editSingleBanner(bannerData).subscribe(res=>{
      if(res["status"])
      {
        this.toast.success(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
        this.routerBtn.navigate(['/all-banner']);
      }
      else
      {
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    });
  }

}
