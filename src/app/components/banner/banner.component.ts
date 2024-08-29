import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {

  private innerHeight: any;
  private workpageHeight = 0;
  private skillpageHeight = 0;


  constructor() {}

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerHeight = window.innerHeight;
  }


  public startOffset = "40%";

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;
    const workElement = document.getElementById('work');
    const skillElement = document.getElementById('skills');
    const textElement = document.getElementById('banner-text');
    if (workElement && skillElement) {
      this.workpageHeight = workElement.offsetHeight;
      this.skillpageHeight = skillElement.offsetHeight;
    }

    const startAnimation = this.innerHeight + this.workpageHeight + (this.skillpageHeight * 0.4);
    const endAnimation = this.innerHeight + this.workpageHeight + (this.skillpageHeight * 0.8);
    if (textElement) {
      if (scrollPosition > startAnimation) {
        const progress = (scrollPosition - startAnimation) / (endAnimation - startAnimation);
        let percent = 30 + (7*progress);
        console.log("progress:"+progress);
        console.log("%:"+percent);
        textElement.setAttribute("startOffset", `${percent}%`);
      }
    }
  }
}
