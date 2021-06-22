import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {CompanyService} from "../../shared/company.service"



@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  returneddata:Array<any>;
  core:number=0;
  mass:number=0;
  dream:number=0;
  canvas: any;
  ctx: any;

  canvas1: any;
  ctx1: any;

  canvas2: any;
  ctx2: any;

  canvas3: any;
  ctx3: any;

  ngAfterViewInit() {
 
  }

  constructor( public companyService: CompanyService ) { 
    this.companyService.GetCompanyList().subscribe((actionArray) => {
        this.returneddata = actionArray.map((item) => {
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as any),
          };      
      });
      for(var i in this.returneddata){
        if(this.returneddata[i]["Tier"]==="Core"){
            this.core++;
        }
        else if(this.returneddata[i]["Tier"]==="Mass"){
          this.mass++;
        }
        else{
          this.dream++;
        }
      }
     this.canvas = document.getElementById('Charttier');
     this.ctx = this.canvas.getContext('2d');
     let myChart = new Chart(this.ctx, {
       type: 'doughnut',
       data: {
           labels: ["Core", "Mass", "Dream"],
           datasets: [{
               label: '# of Votes',
               data: [this.core,this.mass,this.dream],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)'
               ],
               borderWidth: 3
           }]
       },
  
        options: {
        responsive: true,
        plugins: {
          legend: {
          position:'bottom',
          }
        }
      }
     });


     this.canvas1 = document.getElementById('Chartcompanies');
     this.ctx1 = this.canvas1.getContext('2d');
     let Chartcompanies = new Chart(this.ctx1, {
       type: 'pie',
       data: {
           labels: ["Core", "Mass", "Dream"],
           datasets: [{
               label: '# of Votes',
               data: [this.core,this.mass,this.dream],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)'
               ],
               borderWidth: 3
           }]
       },
        options: {
        responsive: true,
        plugins: {
          legend: {
          position:'bottom',
          }
        }
      }
     });



     this.canvas2 = document.getElementById('Chartsample');
     this.ctx2 = this.canvas2.getContext('2d');
     let Chartsample = new Chart(this.ctx2, {
       type: 'pie',
       data: {
           labels: ["Core", "Mass", "Dream"],
           datasets: [{
               label: '# of Votes',
               data: [this.core,this.mass,this.dream],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)'
               ],
               borderWidth: 3
           }]
       },
        options: {
        responsive: false,
        plugins: {
          legend: {
          position:'bottom',
          }
        }
      }
     });


     this.canvas3 = document.getElementById('Chartbar');
     this.ctx3 = this.canvas3.getContext('2d');
     let Chartbar = new Chart(this.ctx3, {
       type: 'bar',
       data: {
           labels: ["Core", "Mass", "Dream","Core", "Mass", "Dream","Dream"],
           datasets: [{
               label: '# of Votes',
               data: [this.core,this.mass,this.dream,5,6,2,9],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)'
               ],
               borderWidth: 3
           }]
       },
        options: {
        responsive: true,
        plugins: {
          legend: {
          position:'bottom',
          }
        }
      }
     });


    });
  }
  ngOnInit(): void {
  }

}
