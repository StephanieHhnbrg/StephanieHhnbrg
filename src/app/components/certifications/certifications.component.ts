import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CreedlyService} from "../../services/creedly.service";
import {Badge} from "../../data/badge.data";

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit, OnDestroy{

  public badges: Badge[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private creedlyService: CreedlyService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.creedlyService.fetchCreedlyData()
      .subscribe(result => {
        this.badges = result;
      }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }


}
