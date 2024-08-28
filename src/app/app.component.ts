import { Component, HostListener, OnInit} from '@angular/core';
import { TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private innerWidth: any;
  private innerHeight: any;
  public scrolled: boolean = false;


  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;
    const blendStart = 50; // Scroll position to start the blend-out effect
    const blendEnd = this.innerHeight - 200; // Scroll position to end the blend-out effect

    const svgElement = document.getElementById('blend-svg');
    const backgroundImg = document.getElementById('page1');
    let opacity = 1;
    if (svgElement && backgroundImg) {
      const progress = (scrollPosition - blendStart) / (blendEnd - blendStart);
      if (scrollPosition > blendStart && scrollPosition < blendEnd) {
        let translateX = (this.innerWidth - 500) * progress;
        svgElement.style.transform = `translateX(${translateX}px)`;
        opacity = 1 - progress;
      } else if (scrollPosition >= blendEnd) {
        let translateX = this.innerWidth - 500;
        svgElement.style.transform = `translateX(${translateX}px) scale(0.6)`;
        opacity = 0;
      } else {
        svgElement.style.transform = `translateX(0px) scale(1)`;
      }
      this.scrolled = progress > 0.5;
      backgroundImg.style.opacity = opacity.toString();
    }

  }

  public scroll(elementId: string) {
    console.log(elementId);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({behavior: "smooth"});
    }
  }
}
