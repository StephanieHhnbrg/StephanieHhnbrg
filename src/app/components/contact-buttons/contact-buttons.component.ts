import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CV_LINKS} from "../../ links.data";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact-buttons',
  templateUrl: './contact-buttons.component.html',
  styleUrl: './contact-buttons.component.css'
})
export class ContactButtonsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public cvLinkCurrentLang: string;

  constructor(private translate: TranslateService) {
    this.cvLinkCurrentLang = CV_LINKS.get("en")!;
  }

  ngOnInit() {
    this.subscriptions.push(this.translate.onLangChange.subscribe(event => {
      this.cvLinkCurrentLang = CV_LINKS.get(event.lang) || CV_LINKS.get("en")!;
    }));
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
