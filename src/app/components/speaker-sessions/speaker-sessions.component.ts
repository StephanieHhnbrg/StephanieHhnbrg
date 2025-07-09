import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SessionizeService} from "../../services/sessionize.service";
import {SessionizeResponse} from "../../data/sessionize-response.data";

@Component({
  selector: 'app-speaker-sessions',
  templateUrl: './speaker-sessions.component.html',
  styleUrl: './speaker-sessions.component.css'
})
export class SpeakerSessionsComponent implements OnInit, OnDestroy{

  public data: SessionizeResponse | undefined;

  private subscriptions: Subscription[] = [];
  constructor(private sessionizeService: SessionizeService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.sessionizeService.getDataObservable()
      .subscribe(result => { this.data = result; }));
  }

  public isUpcomingEvent(dateStr: string): boolean {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate > today;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

}
