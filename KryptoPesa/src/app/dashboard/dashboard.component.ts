import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavService } from '../service/nav.service';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import{ChartConfiguration,ChartType}from  'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { Dialog2Component } from '../dialog2/dialog2.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  solData: any;
  days : number=1;
 

 
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Solana Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#5BC43B',
        pointBackgroundColor: '#5BC43B',
        pointBorderColor: '#5BC43B',
        pointHoverBackgroundColor: '#5BC43B',
        pointHoverBorderColor: '#5BC43B',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(
    private nav: NavService,
    private solApi : ApiService,
    public dialog: MatDialog,
    private toast:NgToastService,
    private api : ApiService,
  ) { }

  ngOnInit(): void {
    this.nav.hide();
    this.getSolDetail();
    this.getSolanaGraphData(this.days);
  }

  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'28%'
    }).afterClosed().subscribe(val => {
    if(val==='save'){
        this.getAllProduct();
      }
    })
  }

  openDialog2() {
    this.dialog.open(Dialog2Component,{
      width:'28%'
    }).afterClosed().subscribe(val => {
    if(val==='save'){
        this.getAllProduct();
      }
    })
  }
  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        console.log(res)

      },
      error:(err)=>{
        this.toast.error({detail:'ERROR!!!',summary:"Error while recording/fetching the data!!",duration:5000})
        // alert('error while recording/fetching the data')
      }
    })

  }

editProduct(row : any){
   this.dialog.open(DialogComponent,{
     width:'40%',
     data:row
}).afterClosed().subscribe(val => {
  if(val==='update'){
      this.getAllProduct();
    }
  })
}

deleteProduct(id : number){
  this.api.deleteProduct(id)
  .subscribe({
    next:(res)=>{
      alert("Product Deleted Successfully")
       this.getAllProduct();
    },
    error:()=>{
      this.toast.error({detail:'CANCELLED!!!',summary:"Error while Deleting the product!!",duration:5000})
      // alert('Error while Deleting the product');
    }
  })

}

  getSolDetail(){
    this.solApi.getSolanaCurrency()
    .subscribe(res=>{
      this.solData = res;
      console.log(this.solData)

    })
  }

  getSolanaGraphData(days:number){
    this.days = days
    this.solApi.getSolanaDataGraphically(this.days)
    .subscribe(res=>{
      setTimeout(()=>{
        this.myLineChart.chart?.update();
      },100)

      console.log(res)
      this.lineChartData.datasets[0].data =res.prices.map((a:any)=>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours() - 12}: ${date.getMinutes()} AM` 

        return this.days === 1 ? time : date.toLocaleDateString();
      })

    })
  }

}

