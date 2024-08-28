import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  public ghAccounts = [
    { url: "https://github.com/StephanieHhnbrg", img: "./assets/images/profile.jpg", translateKey: "GITHUB_LINKS.CURRENT"},
    { url: "https://github.com/StephanieHohenberg", img: "./assets/images/gravatar.png", translateKey: "GITHUB_LINKS.ARCHIVED"}
  ];

  constructor(private translate: TranslateService) {
  }

  public scroll(elementId: string) {
    console.log(elementId);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({behavior: "smooth"});
    }
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

}
