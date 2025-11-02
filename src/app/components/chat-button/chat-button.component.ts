import {Component, inject} from '@angular/core';
import {ChatComponent} from "../chat/chat.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FeatureFlagService} from "../../services/feature-flag.service";

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.css'
})
export class ChatButtonComponent {

  public isChatEnabled: boolean;
  private _bottomSheet = inject(MatBottomSheet);

  constructor(private featureFlagService: FeatureFlagService) {
    this.isChatEnabled = this.featureFlagService.isChatbotEnabled();
  }

  openChat(): void {
    this._bottomSheet.open(ChatComponent);
  }

}
