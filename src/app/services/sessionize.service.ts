import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, ReplaySubject, Subscription} from "rxjs";
import {environment} from '../../environment/environment';

import {SessionizeResponse} from "../data/sessionize-response.data";

@Injectable({
  providedIn: 'root'
})
export class SessionizeService {

  private data: SessionizeResponse | undefined
  private fetchData$ = new ReplaySubject<SessionizeResponse>(1);

  constructor(private http: HttpClient) { }

  public triggerDataFetching(): Subscription {
    return this.fetchSessionizeData().subscribe(response => {
      this.data = response;
      this.fetchData$.next(this.data);
    });
  }

  public getDataObservable(): Observable<SessionizeResponse> {
    return this.fetchData$.asObservable();
  }

  private fetchSessionizeData(): Observable<SessionizeResponse> {
    const endpoint = `https://sessionize.com/api/speaker/json/${environment.sessionizeId}`
    return this.http.get<SessionizeResponse>(endpoint);
  }
}
