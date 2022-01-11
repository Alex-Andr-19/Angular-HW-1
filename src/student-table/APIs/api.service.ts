import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class APIService {

  constructor(private http: HttpClient) { }

  getData(): any {
    const url: string = environment.staticDataAPI;
    return this.http.get(url);
  }
}
