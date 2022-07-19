import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {

   }

  GetData(codebase: string){
    return this.http.get("https://open.er-api.com/v6/latest/"+codebase);
  }

  

}

