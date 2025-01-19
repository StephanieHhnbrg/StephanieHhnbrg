import {Component, OnDestroy, OnInit} from '@angular/core';
import { Application } from '@splinetool/runtime';
import {CvPdfDialog} from "../../components/cv-pdf-dialog/cv-pdf-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {firstValueFrom, Subscription} from "rxjs";
import {CV_LINKS} from "../../ links.data";
@Component({
  selector: 'app-animation-page',
  templateUrl: './animation-page.component.html',
  styleUrl: './animation-page.component.css'
})
export class AnimationPageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private translate: TranslateService) {}

  async ngOnInit() {
    const canvas = document.getElementById('spline');
    // https://www.npmjs.com/package/@splinetool/runtime
    const spline = new Application(<HTMLCanvasElement>canvas);
    await firstValueFrom(this.translate.get('_'));
    spline.load('https://prod.spline.design/AxZheWuU4DZSXNUO/scene.splinecode',
      { description: this.translate.instant("ANIMATION.DESCRIPTION"), isEnglish: true })
      .then(() => {
        spline.addEventListener('mouseUp', (e) => {
          if (e.target.name === 'Computer') {
            let link = CV_LINKS.get(this.translate.currentLang) || CV_LINKS.get("en")!;
            this.dialog.open(CvPdfDialog, {   width: `${window.innerWidth*0.8}px`, data: { link}});
          }
        });
      });

    this.subscriptions.push(this.translate.onLangChange.subscribe(event => {
      spline.setVariables({ description: this.translate.instant("ANIMATION.DESCRIPTION"), isEnglish: event.lang == "en" });
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
