import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-banner',
  templateUrl: './show-banner.component.html',
  styleUrls: ['./show-banner.component.css']
})
export class ShowBannerComponent implements OnInit {

  banners = [];
  bannerImg;

  isLoading = true;

  filteredStatus='';
  reverse:boolean = false;
  sortAllow;

  p:number =1;

  constructor(private bannerService:BannerService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.getAllbanners();
  }

  getAllbanners() {
    this.bannerService.getAllBanners().subscribe(result => {
      if (result['status']) {
        result['banners'].forEach(singleBanner=>{      
          this.bannerImg = singleBanner.bannerImg;
          singleBanner.bannerImg = "https://quizeee-app-api.herokuapp.com/api/download/"+singleBanner.bannerImg;         
        });

        this.banners = result['banners'];
        console.log(this.banners);
        this.hideloader();
      }
    })
  }

  hideloader() {  
    console.log("Stop Loading");
    this.isLoading = false;
  }

  toggle(event: MatSlideToggleChange,bannerId) {
    console.log('Toggle fired',event.checked);
    var newStatus:number;
    if(event.checked)
    {
      newStatus = 1;
    }
    else{
      newStatus = 0;
    }

    var bannerData = {
      bannerId:+bannerId,
      bannerURL : this.banners[0].bannerURL,
      bannerImg : this.bannerImg,
      bannerStatus : newStatus      
    };
    console.log(bannerData);
    this.bannerService.editSingleBanner(bannerData).subscribe(res=>{
      if(res["status"])
      {
        this.toast.info("Status Changed Successfully","Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });

      }else{
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    })
  }


}
