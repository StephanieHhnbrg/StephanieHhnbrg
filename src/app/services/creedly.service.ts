import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, ReplaySubject, Subscription} from "rxjs";
import {environment} from '../../environment/environment';
import {CreedlyResponse} from "../data/creedly-response.data";
import {Badge} from "../data/badge.data";
import {JAVA_CERT} from "../data/java-cert.data";

@Injectable({
  providedIn: 'root'
})
export class CreedlyService {

  private data: Badge[] = [];
  private fetchData$ = new ReplaySubject<Badge[]>(1);

  constructor(private http: HttpClient) { }

  public triggerDataFetching(): Subscription {
    return this.fetchCreedlyData().subscribe(response => {
      this.data = [JAVA_CERT].concat(response);
      this.fetchData$.next(this.data);
    });
  }

  public getDataObservable(): Observable<Badge[]> {
    return this.fetchData$.asObservable();
  }

  private fetchCreedlyData(): Observable<Badge[]> {
    const encodedUrl = encodeURIComponent(`https://www.credly.com/users/${environment.credlyUserId}/badges.json`);
    const endpoint = `https://api.allorigins.win/get?url=${encodedUrl}`;

    return this.http.get<{contents: string}>(endpoint).pipe(
      map(response => this.parseCreedlyResponse(response)));
  }

  private parseCreedlyResponse(response: {contents: string}): Badge[] {
    let parsed: CreedlyResponse = JSON.parse(response.contents);
    return parsed.data.map(item => {
      let issuer =  item.issuer.entities.reduce((acc: string[], current) => {
        return [...acc, current.entity.name];
      }, []).join(', ');
      let skills = item.badge_template.skills.map(skill => skill.name);
      return {
        imageLink: item.image_url,
        url: `https://www.credly.com/badges/${item.id}/public_url`,
        name: item.badge_template.name,
        date: item.issued_at_date,
        description: item.badge_template.description,
        skills,
        issuer,
      };
    });
  }

}
