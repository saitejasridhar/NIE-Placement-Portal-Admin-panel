import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Company } from 'src/app/shared/company';
import {CompanyService} from "../../shared/company.service"
import { StudentService } from "../../shared/students.service";




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

  canvas4: any;
  ctx4: any;


  canvas5: any;
  ctx5: any;

  canvas6: any;
  ctx6: any;

  canvas7: any;
  ctx7: any;


  data:any
  placed:Array<number>=[0,0,0,0,0,0,0,0];
  unplaced:Array<number>=[0,0,0,0,0,0,0,0];

  totalplaced:number=0;
  totalunplaced:number=0;
  totalstudents:number=0;

  corecompanystudents:number=0;
  masscompanystudents:number=0;
  dreamcompanystudents:number=0;

  coretotalpackage:number=0;
  masstotalpackage:number=0;
  dreamtotalpackage:number=0;

  CSEpackage:number=0;
  ISEpackage:number=0;
  Mechpackage:number=0;
  IPEpackage:number=0;
  Civilpackage:number=0;
  EEEpackage:number=0;
  ECpackage:number=0;

  CSEcompanies:number=0;
  ISEcompanies:number=0;
  Mechcompanies:number=0;
  IPEcompanies:number=0;
  Civilcompanies:number=0;
  EEEcompanies:number=0;
  ECcompanies:number=0;

  CSE0company:number=0;
  ISE0company:number=0;
  Mech0company:number=0;
  IPE0company:number=0;
  Civil0company:number=0;
  EEE0company:number=0;
  EC0company:number=0;

  CSE2company:number=0;
  ISE2company:number=0;
  Mech2company:number=0;
  IPE2company:number=0;
  Civil2company:number=0;
  EEE2company:number=0;
  EC2company:number=0;

  CSE1company:number=0;
  ISE1company:number=0;
  Mech1company:number=0;
  IPE1company:number=0;
  Civil1company:number=0;
  EEE1company:number=0;
  EC1company:number=0;

  appliedcore:number=0;
  appliedmass:number=0;
  applieddream:number=0;

  placedcore:number=0;
  placedmass:number=0;
  placeddream:number=0;


  ngAfterViewInit() {
 
  }

  constructor( public companyService: CompanyService ,public studentService: StudentService,) { 
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
            this.corecompanystudents=this.corecompanystudents+this.returneddata[i]["Placed"].length;
            this.coretotalpackage=this.coretotalpackage+this.returneddata[i]["Ctc"];
            if( this.returneddata[i]["isHistory"]==="true"){
              this.appliedcore+= this.returneddata[i]["AppliedStudents"].length;
              this.placedcore+=this.returneddata[i]["Placed"].length;
            }
        }
        else if(this.returneddata[i]["Tier"]==="Mass"){
          this.mass++;
          this.masscompanystudents=this.masscompanystudents+this.returneddata[i]["Placed"].length;
          this.masstotalpackage=this.masstotalpackage+this.returneddata[i]["Ctc"];
          if( this.returneddata[i]["isHistory"]==="true"){
            this.appliedmass+= this.returneddata[i]["AppliedStudents"].length;
            this.placedcore+=this.returneddata[i]["Placed"].length;
          }
        }
        else{
          this.dream++;
          this.dreamcompanystudents=this.dreamcompanystudents+this.returneddata[i]["Placed"].length;
          this.dreamtotalpackage=this.dreamtotalpackage+this.returneddata[i]["Ctc"];
          if( this.returneddata[i]["isHistory"]==="true"){
            this.applieddream+= this.returneddata[i]["AppliedStudents"].length;
            this.placeddream+=this.returneddata[i]["Placed"].length;
          }
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
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 205, 86, 0.2)',
               ],
            borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 205, 86, 1)',
           ],
            borderWidth: 1
           }]
       },
  
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Company tier Distribution'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });

    

     this.canvas1 = document.getElementById('Chartaveragepackage');
     this.ctx1 = this.canvas1.getContext('2d');
     let Chartaveragepackage = new Chart(this.ctx1, {
       type: 'doughnut',
       data: {
           labels: ["Core", "Mass", "Dream"],
           datasets: [{
               label: '# of Votes',
               data: [this.coretotalpackage/this.core,this.masstotalpackage/this.mass,this.dreamtotalpackage/this.dream],
               backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 205, 86, 0.2)',
               ],
            borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 205, 86, 1)',
           ],
            borderWidth: 1
           }]
       },
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Tier avergae package'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });



     this.canvas4 = document.getElementById('Chartcompanies');
     this.ctx4 = this.canvas4.getContext('2d');
     let Chartcompanies = new Chart(this.ctx4, {
       type: 'doughnut',
       data: {
           labels: ["Core", "Mass", "Dream"],
           datasets: [{
               label: '# of Votes',
               data: [this.corecompanystudents,this.masscompanystudents,this.dreamcompanystudents],
               backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 205, 86, 0.2)',
               ],
            borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 205, 86, 1)',
           ],
            borderWidth: 1
           }]
       },
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Students placed in each Tier'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });


     for(var i in this.returneddata){
      if(this.returneddata[i]['Branch'].includes('CSE')){
        this.CSEpackage=this.CSEpackage+this.returneddata[i]["Ctc"];
        this.CSEcompanies++;
      }
      if(this.returneddata[i]['Branch'].includes('ISE')){
        this.ISEpackage=this.ISEpackage+this.returneddata[i]["Ctc"];
        this.ISEcompanies++;
      }
      if(this.returneddata[i]['Branch'].includes('EEE')){
        this.EEEpackage=this.EEEpackage+this.returneddata[i]["Ctc"];
        this.EEEcompanies++;
      }
      if(this.returneddata[i]['Branch'].includes('ECE')){
        this.ECpackage=this.ECpackage+this.returneddata[i]["Ctc"];
        this.ECcompanies++
      }
      if(this.returneddata[i]['Branch'].includes('ME')){
        this.Mechpackage=this.Mechpackage+this.returneddata[i]["Ctc"];
        this.Mechcompanies++;
      }
      if(this.returneddata[i]['Branch'].includes('CE')){
        this.Civilpackage=this.Civilpackage+this.returneddata[i]["Ctc"];
        this.Civilcompanies++;
      }
      if(this.returneddata[i]['Branch'].includes('IPE')){
        this.IPEpackage=this.IPEpackage+this.returneddata[i]["Ctc"];
        this.IPEcompanies++;
      }

     }




     this.canvas5 = document.getElementById('Chartbranchpackage');
     this.ctx5 = this.canvas5.getContext('2d');
     let Chartbranchpackage = new Chart(this.ctx5, {
       type: 'polarArea',
       data: {
           labels: ["CSE", "ISE", "MECH","IPE","CIVIL","EEE","EC"],
           datasets: [{
               label: '# of Votes',
               data: [this.CSEpackage/this.CSEcompanies,this.ISEpackage/this.ISEcompanies,this.Mechpackage/this.Mechcompanies,this.IPEpackage/this.IPEcompanies,
                this.Civilpackage/this.Civilcompanies,this.EEEpackage/this.EEEcompanies,this.ECpackage/this.ECcompanies],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(25, 206, 86, 1)',
                   'rgb(75, 192, 192, 1)',
                   'rgb(201, 203, 207, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 205, 86, 1)',
               ],
               borderWidth: 3
           }]
       },
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Branch wise average package'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });



     this.canvas6 = document.getElementById('Chartbranchcompanies');
     this.ctx6 = this.canvas6.getContext('2d');
     let Chartbranchcompanies = new Chart(this.ctx6, {
       type: 'polarArea',
       data: {
           labels: ["CSE", "ISE", "MECH","IPE","CIVIL","EEE","EC"],
           datasets: [{
               label: '# of Votes',
               data: [this.CSEcompanies,this.ISEcompanies,this.Mechcompanies,this.IPEcompanies,
                this.Civilcompanies,this.EEEcompanies,this.ECcompanies],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(25, 206, 86, 1)',
                   'rgb(75, 192, 192, 1)',
                   'rgb(201, 203, 207, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 205, 86, 1)',
               ],
               borderWidth: 3
           }]
       },
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Branch wise number of companies'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });



     this.canvas1 = document.getElementById('intakemass');
     this.ctx1 = this.canvas1.getContext('2d');
     let intakemass = new Chart(this.ctx1, {
       type: 'doughnut',
       data: {
        labels: ["Applied","Placed"],
           datasets: [{
               label: '# of Votes',
              //  data: [this.appliedmass,this.placedmass],
              data: [5,1],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)'
               ],
               borderWidth: 3
           }]
       },
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Percentage of students in Mass'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });

     this.canvas1 = document.getElementById('intakecore');
     this.ctx1 = this.canvas1.getContext('2d');
     let intakecore = new Chart(this.ctx1, {
       type: 'doughnut',
       data: {
        labels: ["Applied","Placed"],
           datasets: [{
               label: '# of Votes',
              //  data: [this.appliedcore,this.placedcore],
              data: [51,8],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)'
               ],
               borderWidth: 3
           }]
       },
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Percentage of students in Core'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });


     this.canvas1 = document.getElementById('intakedream');
     this.ctx1 = this.canvas1.getContext('2d');
     let intakedream = new Chart(this.ctx1, {
       type: 'doughnut',
       data: {
           labels: ["Applied","Placed"],
           datasets: [{
               label: '# of Votes',
              //  data: [this.applieddream,this.placeddream],
              data: [5,8],
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)'
               ],
               borderWidth: 3
           }]
       },
        options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Percentage of students in Dream'
        },
          legend: {
          position:'bottom',
          }
        }
      }
     });


    });

    this.studentService.GetStudentList().subscribe((actionArray) => {
      this.data = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Company),
        };
      });

      for(var i in this.data){
        this.totalstudents++;
        switch (this.data[i]['Branch']){
          case "CSE":
            if(this.data[i]['PlacedAt'].length>0){
              this.placed[0]++;

              if(this.data[i]['PlacedAt'].length==1){
                this.CSE1company++;
              }
              else{
                this.CSE2company++;
              }
            }
           if(this.data[i]['PlacedAt'].length===0){
            this.CSE0company++;
            this.unplaced[0]++;
           }
           break;

           case "ISE":
            if(this.data[i]['PlacedAt'].length>0){
              this.placed[1]++;
              if(this.data[i]['PlacedAt'].length==1){
                this.ISE1company++;
              }
              else{
                this.ISE2company++;
              }
            }
           if(this.data[i]['PlacedAt'].length==0){
            this.unplaced[1]++;
            this.ISE0company++;
           }
           break;

           case "MECH":
            if(this.data[i]['PlacedAt'].length>0){
              this.placed[2]++;
              if(this.data[i]['PlacedAt'].length==1){
                this.Mech1company++;
              }
              else{
                this.Mech2company++;
              }
            }
           if(this.data[i]['PlacedAt'].length==0){
            this.unplaced[2]++;
            this.Mech0company++;
           }
           break;

           case "IPE":
            if(this.data[i]['PlacedAt'].length>0){
              this.placed[3]++;
              if(this.data[i]['PlacedAt'].length==1){
                this.IPE1company++;
              }
              else{
                this.IPE2company++;
              }
            }
           if(this.data[i]['PlacedAt'].length==0){
            this.unplaced[3]++;
            this.IPE0company++;
           }
           break;

           case "CIVIL":
            if(this.data[i]['PlacedAt'].length>0){
              this.placed[4]++;
              if(this.data[i]['PlacedAt'].length==1){
                this.Civil1company++;
              }
              else{
                this.Civil2company++;
              }
            }
           if(this.data[i]['PlacedAt'].length==0){
            this.unplaced[4]++;
            this.Civil0company++;
           }
           break;

           case "EEE":
            if(this.data[i]['PlacedAt'].length>0){
              this.placed[5]++;
              if(this.data[i]['PlacedAt'].length==1){
                this.EEE1company++;
              }
              else{
                this.EEE2company++;
              }
            }
           if(this.data[i]['PlacedAt'].length==0){
            this.unplaced[5]++;
            this.EEE0company++;
           }
           break;

           case "EC":
             if(this.data[i]['PlacedAt'].length>0){
              this.placed[6]++;
              if(this.data[i]['PlacedAt'].length==1){
                this.EC1company++;
              }
              else{
                this.EC2company++;
              }
             }
           if(this.data[i]['PlacedAt'].length==0){
            this.unplaced[6]++;
            this.EC0company++;
           }
           break;
        }
      }


      this.canvas7 = document.getElementById('BranchPackagePlaced');
      this.ctx7 = this.canvas7.getContext('2d');
      let BranchPackagePlaced = new Chart(this.ctx7, {
        type: 'radar',
        data: {
            labels: ["CSE", "ISE", "MECH","IPE", "CIVIL", "EEE","EC"],
            datasets: [{
              label: '<1 company',
              data: [82, 41, 40, 1, 91, 7, 70],
              // data: [this.CSE0company, this.ISE0company, this.Mech0company, this.IPE0company, this.Civil0company, this.EEE0company, this.EC0company],
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
              label: '1 company',
              // data: [this.CSE1company, this.ISE1company, this.Mech1company, this.IPE1company, this.Civil1company, this.EEE1company, this.EC1company],
              data: [28, 48, 40, 19, 96, 27, 100],
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              borderColor: 'rgb(54, 162, 235)',
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(54, 162, 235)'
            },
            {
              label: '>1 company',
              data: [this.CSE2company, this.ISE2company, this.Mech2company, this.IPE2company, this.Civil2company, this.EEE2company, this.EC2company],
              fill: true,
              backgroundColor:  'rgba(255, 206, 86, 0.1)',
              borderColor: 'rgb(255, 206, 86)',
              pointBackgroundColor: 'rgb(255, 206, 86)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 206, 86)'
            }],
        },
         options: {
          scale: {
            ticks: {
              precision: 0
            }
          },
         responsive: true,
         plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Branch wise Placed vs Unplaced'
        },
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
            labels: ["CSE", "ISE", "ME","IPS", "CV", "EEE","EC"],
            datasets: [
             {
                //  barThickness: 30,
                 label: "Placed",
                 fill: false,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor:[
                    'rgba(255, 99, 132, 1)'
                  ],
                  borderWidth: 1,
                //  data: this.placed
                data:[2,5,6,3,1,9,3]
             },
             {
                // barThickness: 30,
                 label: "UnPlaced",
                 ill: false,
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                  ],
                  borderColor:[
                    'rgba(54, 162, 235, 1)'
                  ],
                  borderWidth: 1,
                //  data: this.unplaced
                data:[4,5,2,1,6,8,4]
             },
         ]
        },
         options: {
           
          indexAxis: 'y',
         responsive: true,
         plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Branch wise Placed vs Unplaced'
        },
           legend: {
           position:'bottom',
           }
         }
       },
       
      });

      for (var i in this.placed) {  
        this.totalplaced =this.totalplaced + this.placed[i];  
     }  
     this.totalunplaced=this.totalstudents-this.totalplaced;


     this.canvas2 = document.getElementById('Chartsample');
     this.ctx2 = this.canvas2.getContext('2d');
     let Chartsample = new Chart(this.ctx2, {
       type: 'doughnut',
       data: {
           labels: ["Placed", "Unplaced"],
           datasets: [{
               label: '# of Votes',
               data: [this.totalplaced,this.totalunplaced],
               backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
               ],
               borderColor:[
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
               borderWidth: 1
           }]
       },
        options: {
        responsive: true,
        plugins: {
          title: {
            font: {
              size: 15
            },
            display: true,
            text: 'Placed vs Unplaced students'
        },
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
