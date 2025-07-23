import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatMessages: { role: 'bot'|'user', text: string, failed?: boolean }[] = [];
  private botMssgReceived$ = new Subject<{ role: 'bot', text: string }>();

  constructor(private http: HttpClient,
              private translate: TranslateService) {
    let text = this.translate.instant("CHAT.INIT_MSSG");
    this.chatMessages.push({ role: 'bot', text });
  }

  public getMessages(): { role: 'bot'|'user', text: string, failed?: boolean  }[] {
    return this.chatMessages;
  }

  public getBotMssgReceivedObservable(): Observable<{ role: 'bot', text: string }> {
    return this.botMssgReceived$.asObservable();
  }

  public getResponseForUserMessage(question: string): Subscription {
    const endpoint = environment.chatEndpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<{ answer: string }>(endpoint, JSON.stringify({question}), httpOptions).subscribe({
      next: (response) => {
        this.botMssgReceived$.next({role: 'bot', text: response.answer});
      },
      error: (err) => {
        console.log(err);
        let messages = this.chatMessages.filter(mssg => mssg.text == question);
        if (messages.length > 0) {
          messages[messages.length -1].failed = true;
        }

        let text = this.translate.instant("CHAT.UNAVAILABLE");
        if (err.error && err.error.detail && err.error.detail.toLowerCase().includes("rate limit reached")) {
          text = this.translate.instant("CHAT.TOKEN_LIMITED");
        }

        this.botMssgReceived$.next({role: 'bot', text});
      }
    });
  }
}
