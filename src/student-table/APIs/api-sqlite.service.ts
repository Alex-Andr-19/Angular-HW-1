import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class APISQLiteService {

  constructor(private http: HttpClient) { }

  getData(): any {
    const url: string = environment.lifeDataAPI;
    return this.http.get(url);
  }
}
