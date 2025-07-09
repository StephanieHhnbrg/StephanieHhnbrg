import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, ReplaySubject, Subscription} from "rxjs";
import {BlogArticle} from "../data/blog-article.data";
import {RssResponse} from "../data/rss-response.data";
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  private data: BlogArticle[] = []
  private fetchData$ = new ReplaySubject<BlogArticle[]>(1);

  constructor(private http: HttpClient) { }

  public triggerDataFetching(): Subscription {
    return this.fetchBlogArticles().subscribe(response => {
      this.data = response;
      this.fetchData$.next(this.data);
    });
  }

  public getDataObservable(): Observable<BlogArticle[]> {
    return this.fetchData$.asObservable();
  }

  private fetchBlogArticles(): Observable<BlogArticle[]> {
    const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${environment.mediumUsername}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.get<RssResponse>(endpoint, httpOptions).pipe(
      map(result => {
        return result.items.slice(0, 5).map(item => {
          return {
            thumbNail: result.feed.image,
            title: item.title,
            imageLink: this.retrieveImageUrl(item.description),
            description: this.formatDescription(item.description),
            topics: item.categories,
            link: item.guid,
          };
        });
      }));

  }

  private retrieveImageUrl(content: string): string {
    let decoded = content.replace(/\\u003C/g, "<").replace(/\\u003E/g, ">");
    const imageLinks = decoded.match(/<img[^>]+src="([^"]+\.png)"/);
    return imageLinks ? imageLinks[1] : ""
  }

  private formatDescription(description: string): string {
    let decoded = description.replace(/\\u003C/g, "<")
      .replace(/\\u003E/g, ">")
      .replace(/<[^>]+>/g, '');

    return this.truncateAtSentence(decoded, 600);
  }
  private truncateAtSentence(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastPeriod = truncated.lastIndexOf(' ');
    if (lastPeriod !== -1) {
      return truncated.slice(0, lastPeriod + 1).trim() + ' …';
    }

    return truncated.trim() + '…';
  }

}
