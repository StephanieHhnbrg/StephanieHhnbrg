import {Component, OnDestroy, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {CV_LINKS} from "../../ links.data";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public ghAccounts = [
    { url: "https://github.com/StephanieHhnbrg", img: "./assets/images/profile.jpg", translateKey: "GITHUB_LINKS.CURRENT"},
    { url: "https://github.com/StephanieHohenberg", img: "./assets/images/gravatar.png", translateKey: "GITHUB_LINKS.ARCHIVED"}
  ];

  public cvLinkCurrentLang: string;

  constructor(private translate: TranslateService) {
    this.cvLinkCurrentLang = CV_LINKS.get("en")!;
  }

  ngOnInit() {
    this.subscriptions.push(this.translate.onLangChange.subscribe(event => {
      this.cvLinkCurrentLang = CV_LINKS.get(event.lang) || CV_LINKS.get("en")!;
    }));
  }

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  public openLinkedIn() {
    window.open("https://de.linkedin.com/in/hohenberg");
  }

  public downloadCV() {
      const blob = new Blob([], {type: 'pdf'});
      const url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = `cv-stephanie-hohenberg.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
