import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private apiCoin:ApiService,
    public nav:NavService
    ) { }

  coinData:any=[];

  ngOnInit(): void {
    this.getCoinData();
  }

  getCoinData(){
    this.apiCoin.getCurrencyTrending()
    .subscribe(res=>{
      console.log(res)
      this.coinData = res
    })
  }

 

}
