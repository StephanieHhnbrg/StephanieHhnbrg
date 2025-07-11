import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatMessages: { role: 'bot'|'user', text: string }[] = [];
  private botMssgReceived$ = new Subject<{ role: 'bot'|'user', text: string }>();

  constructor(private translate: TranslateService) {
    let text = this.translate.instant("CHAT.INIT_MSSG");
    this.chatMessages.push({ role: 'bot', text });
  }

  public getMessages(): { role: 'bot'|'user', text: string }[] {
    return this.chatMessages;
  }

  public getBotMssgReceivedObservable(): Observable<{ role: 'bot'|'user', text: string }> {
    return this.botMssgReceived$.asObservable();
  }

  public getResponseForUserMessage(text: string) {
    // TODO: connect to backend
    setTimeout(() => {
      let text = this.translate.instant("CHAT.UNAVAILABLE");
      this.botMssgReceived$.next({role: 'bot', text});
    }, 500);
  }
}
