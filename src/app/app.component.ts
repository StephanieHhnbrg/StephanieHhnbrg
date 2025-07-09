import {Component, OnDestroy, OnInit} from '@angular/core';
import { TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from '@angular/material/snack-bar';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Subscription} from "rxjs";
import {MediumService} from "./services/medium.service";
import {CreedlyService} from "./services/creedly.service";
import {SessionizeService} from "./services/sessionize.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  public isMobile = false;
  private hasOpenedSnackbar = false;
  private subscriptions: Subscription[] = [];

  constructor(private translate: TranslateService,
              private breakpointObserver: BreakpointObserver,
              public snackbar: MatSnackBar,
              private mediumService: MediumService,
              private sessionizeService: SessionizeService,
              private creedlyService: CreedlyService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  public ngOnInit() {
    this.subscriptions.push(this.mediumService.triggerDataFetching());
    this.subscriptions.push(this.sessionizeService.triggerDataFetching());
    this.subscriptions.push(this.creedlyService.triggerDataFetching());

    this.subscriptions.push(this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile && !this.hasOpenedSnackbar) {
          this.snackbar.open("Check out the computer to see my CV!", '💻',
            { duration: 7 * 1000});
          this.hasOpenedSnackbar = true;
        }
      }));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
