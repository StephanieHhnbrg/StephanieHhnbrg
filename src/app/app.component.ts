import {Component, OnDestroy, OnInit} from '@angular/core';
import { TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from '@angular/material/snack-bar';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Subscription} from "rxjs";
import {MediumService} from "./services/medium.service";
import {CreedlyService} from "./services/creedly.service";
import {SessionizeService} from "./services/sessionize.service";
import {FeatureFlagService} from "./services/feature-flag.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  public isMobile = false;
  public isAnimationEnabled: boolean;
  private hasOpenedSnackbar = false;
  private subscriptions: Subscription[] = [];

  constructor(private translate: TranslateService,
              private breakpointObserver: BreakpointObserver,
              public snackbar: MatSnackBar,
              private mediumService: MediumService,
              private sessionizeService: SessionizeService,
              private featureFlagService: FeatureFlagService,
              private creedlyService: CreedlyService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.isAnimationEnabled = this.featureFlagService.isAnimationEnabled();
  }

  public ngOnInit() {
    this.subscriptions.push(this.mediumService.triggerDataFetching());
    this.subscriptions.push(this.sessionizeService.triggerDataFetching());
    this.subscriptions.push(this.creedlyService.triggerDataFetching());

    this.subscriptions.push(this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile && !this.hasOpenedSnackbar && this.featureFlagService.isAnimationEnabled()) {
          setTimeout(() => {
            this.snackbar.open("Check out the computer to see my CV!", '💻',
              { duration: 4 * 1000});
          }, 2000 );


          this.hasOpenedSnackbar = true;
        }
      }));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
