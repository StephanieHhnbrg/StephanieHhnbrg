import {Component, inject} from '@angular/core';
import {ChatComponent} from "../chat/chat.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.css'
})
export class ChatButtonComponent {

  private _bottomSheet = inject(MatBottomSheet);

  openChat(): void {
    this._bottomSheet.open(ChatComponent);
  }

}
