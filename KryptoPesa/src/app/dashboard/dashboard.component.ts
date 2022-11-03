import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavService } from '../service/nav.service';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import{ChartConfiguration,ChartType}from  'chart.js'
import { BaseChartDirective } from 'ng2-charts';

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
 

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
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
  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public barChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) myBarChart !: BaseChartDirective;

  constructor(
    private nav: NavService,
    private solApi : ApiService
  ) { }

  ngOnInit(): void {
    this.nav.hide();
    this.getSolDetail();
    this.getSolanaGraphData(this.days);
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
        this.myBarChart.chart?.update();
      },100)

      console.log(res)
      this.barChartData.datasets[0].data =res.prices.map((a:any)=>{
        return a[1];
      });
      this.barChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours() - 12}: ${date.getMinutes()} AM` 

        return this.days === 1 ? time : date.toLocaleDateString();
      })

    })
  }

}

