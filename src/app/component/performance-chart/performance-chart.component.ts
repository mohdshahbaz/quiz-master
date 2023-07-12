import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartScales, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})

export class PerformanceChartComponent implements OnInit {

  allLegends = [];
   //bar chart (for users)
   barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          gridLines: {
              display:true
          },
          display: true,
          ticks: {
            stepSize:20,
            min:0
          }
      }]
    }
    // tooltips: {
    //   backgroundColor: 'rgba(255,255,255,0.9)',
    //   bodyFontColor: '#999',
    //   borderColor: '#999',
    //   borderWidth: 1,
    //   caretPadding: 15,
    //   displayColors: false,
    //   enabled: true,
    //   intersect: true,
    //   mode: 'x',
    //   titleFontColor: '#999',
    //   titleMarginBottom: 10,
    //   xPadding: 15,
    //   yPadding: 15,
    // }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Winning' }
    // { data: [90,67,20,95], label: 'Losing'}
  ];
 
  public barChartColors= [
    {
      backgroundColor:['#FFB51E']
    }
  ];

  constructor(private assignedQuizService:QuizzesService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.barChartData[0].data);
  
    var allData = [];
    var allLabels = [];

    this.route.params.subscribe(Params=>{
      var userId = Params['userId'];
  
    this.assignedQuizService.userCategoryWiseGraph({userId:+userId}).subscribe(res=>{
      console.log(res);
      for(var j = 0;j<res["assignedGraph"].length;j++)
      {
        var str = this.convertToTitleCase(res["assignedGraph"][j].category);
        console.log(str,res["assignedGraph"][j].winningPercentage);

        allData.push(res["assignedGraph"][j].winningPercentage.toFixed(2));
        allLabels.push(str);
        this.allLegends.push({label:str,percentage:res["assignedGraph"][j].winningPercentage.toFixed(2)});

        if(allLabels.length==res["assignedGraph"].length)
        {
          this.barChartData[0].data = allData;
          this.barChartLabels = allLabels;
          for(var i = 0;i<this.barChartData[0].data.length-1;i++)
          {
            this.barChartColors[0].backgroundColor.push('#FFB51E');
          }
        }
      }
    });
   });

  }

 convertToTitleCase(str) {
    return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
  }

}
