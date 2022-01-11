import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  getData() {
    let url: string = "https://aleks-andr-19-fast-server.herokuapp.com/data";
    return this.http.get(url);
  }
}
