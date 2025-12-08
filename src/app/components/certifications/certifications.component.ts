import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CreedlyService} from "../../services/creedly.service";
import {Badge} from "../../data/badge.data";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit, OnDestroy{

  public badges: Badge[] = [];

  public isLoading = false;
  public credlyLink = environment.credlyLink;
  private subscriptions: Subscription[] = [];

  constructor(private creedlyService: CreedlyService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.creedlyService.getDataObservable()
      .subscribe(result => {
        this.badges = result;
      }));
    this.subscriptions.push(this.creedlyService.getLoadingObservable()
      .subscribe(result => {
        this.isLoading = result.valueOf();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }


}
