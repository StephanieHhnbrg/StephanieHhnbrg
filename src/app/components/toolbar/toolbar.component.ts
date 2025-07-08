import {Component} from '@angular/core';
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

  constructor(private translate: TranslateService) {}

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }

}
