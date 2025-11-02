import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  private readonly isSafari: boolean;
  private readonly isChatbotAlive: boolean;

  constructor() {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
    this.isChatbotAlive = true; // TODO: do health check
  }

  public isAnimationEnabled(): boolean {
    return environment.featureFlag_animationEnabled && !this.isSafari;
  }
  public isChatbotEnabled(): boolean {
    return environment.featureFlag_chatbotEnabled && this.isChatbotAlive;
  }
}
