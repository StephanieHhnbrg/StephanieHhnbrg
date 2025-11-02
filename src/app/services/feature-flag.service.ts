import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ChatService} from "./chat.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  private readonly isSafari: boolean;

  private isChatbotEnabled$ = new BehaviorSubject<boolean>(false);

  constructor(private chatService: ChatService) {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);

    if (!environment.featureFlag_chatbotEnabled) {
      this.isChatbotEnabled$.next(false);
    } else {
      this.chatService.checkIfBotIsAlive();
      this.chatService.getBotIsAliveObservable().subscribe(isAlive => {
        this.isChatbotEnabled$.next(isAlive);
        if (isAlive) {
          this.chatService.initMessages();
        }
      });
    }
  }

  public isAnimationEnabled(): boolean {
    return environment.featureFlag_animationEnabled && !this.isSafari;
  }
  public getChatbotEnabledObservable(): Observable<boolean> {
    return this.isChatbotEnabled$.asObservable();
  }
}
