import {Component, inject} from '@angular/core';
import {ChatComponent} from "../chat/chat.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.css'
})
export class ChatButtonComponent {

  public readonly isChatEnabled = environment.featureFlag_chatbotEnabled;
  private _bottomSheet = inject(MatBottomSheet);

  openChat(): void {
    this._bottomSheet.open(ChatComponent);
  }

}
