import { ReturnStatement } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { ApiService } from './exchangerate/api.service';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const Rates = [];

export interface RootObject {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  getValue(val: String) {
    console.warn(val);
  }

  codebase: string = '';
 
  setCodeBase(val: string) {
    this.codebase = val + '';
    this.getExchangeRate();
  }

  title = 'ExchangeRateInquiry';
  images = [944, 1011, 984].map((n) => 'https://picsum.photos/id/${n}/900/500');
  exchange: any;
  exchangerates: any;
  time_last_update_unix: string = '';
  time_next_update_unix: string = '';

  time_last_update_utc: string = '';
  time_next_update_utc: string = '';

  constructor(private service: ApiService) {   

 
  }

  getExchangeRate(){

    this.service.GetData(this.codebase).subscribe((data) => {
      this.exchange = data;

      const obj = this.exchange;
      const myJSON = JSON.stringify(obj);
      this.exchange = JSON.parse(myJSON);
      this.exchangerates = this.exchange.rates;
      var d1 = new Date(this.exchange.time_last_update_unix);
      var d2 = new Date(this.exchange.time_next_update_unix);
      this.time_last_update_unix = d1.toDateString() + '';
      this.time_next_update_unix = d2.toDateString() + '';
      this.time_last_update_utc = this.exchange.time_last_update_utc;
      this.time_next_update_utc = this.exchange.time_next_update_utc;
    });

  }
}
