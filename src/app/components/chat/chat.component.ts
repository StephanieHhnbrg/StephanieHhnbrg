import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  public chatMessages: { role: 'bot'|'user', text: string }[] = [];
  public isLoading = false;

  private _bottomSheetRef =
    inject<MatBottomSheetRef<ChatComponent>>(MatBottomSheetRef);

  private subscriptions: Subscription[] = [];

  constructor(private translate: TranslateService,
              private chatService: ChatService) {}

  public ngOnInit() {
    this.chatMessages = this.chatService.getMessages();
    if (this.chatMessages.length > 1
      && this.chatMessages.at(this.chatMessages.length-1)
      && this.chatMessages.at(this.chatMessages.length-1)!.role == 'user') {
      this.isLoading = true;
      let text = this.chatMessages.at(this.chatMessages.length-1)!.text;
      this.subscriptions.push(this.chatService.getResponseForUserMessage(text));
    }
    this.subscriptions.push(this.chatService.getBotMssgReceivedObservable().subscribe(mssg => {
      this.chatMessages.push(mssg);
      this.isLoading = false;
      this.scrollToBottom();
    }));
  }

  public ngAfterViewInit() {
    this.scrollToBottom();
  }

  public sendMessage(text: string, input: HTMLInputElement) {
    if (this.isLoading) {
      return;
    }

    if (text.trim().length == 0) {
      return;
    }
    this.chatMessages.push({ role: 'user', text });
    this.subscriptions.push(this.chatService.getResponseForUserMessage(text));
    input.value= "";
    this.isLoading = true;
    input.blur();
    this.scrollToBottom();
  }

  public closeChat(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
