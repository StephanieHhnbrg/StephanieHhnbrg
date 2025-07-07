import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environment/environment';

import {SessionizeResponse} from "../data/sessionize-response.data";

@Injectable({
  providedIn: 'root'
})
export class SessionizeService {
  constructor(private http: HttpClient) { }

  public fetchSessionizeData(): Observable<SessionizeResponse> {
    const endpoint = `https://sessionize.com/api/speaker/json/${environment.sessionizeId}`
    return this.http.get<SessionizeResponse>(endpoint);
  }
}
