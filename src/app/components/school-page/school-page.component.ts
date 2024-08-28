import {Component, HostListener, OnInit} from '@angular/core';
import {AnimationService} from "../../services/animation.service";

@Component({
  selector: 'app-school-page',
  templateUrl: './school-page.component.html',
  styleUrl: './school-page.component.scss'
})
export class SchoolPageComponent implements OnInit {
  private innerHeight: any;
  private workpageHeight = 0;
  private skillpageHeight = 0;

  public displayedSlide: {img: string, translateKey:string, period:string, index: number} | undefined;
  public slides = [
    {img: "./assets/images/education/dortmund.png", translateKey: "EDU.TU_DORTMUND", period: "2013 - 2017"},
    {img: "./assets/images/education/leiden.png", translateKey: "EDU.LEIDEN", period: "2014 - 2015"},
    {img: "./assets/images/education/esn.png", translateKey: "EDU.ESN", period: "2015 - 2017"},
    {img: "./assets/images/education/do_hackathon.png", translateKey: "EDU.DO_HACKATHON", period: "2016"},
    {img: "./assets/images/education/berlin.png", translateKey: "EDU.FU_BERLIN", period: "2018 - 2021"},
    {img: "./assets/images/education/helsinki.png", translateKey: "EDU.ALTO_HACKATHON", period: "2019"},
    {img: "./assets/images/education/barcelona.png", translateKey: "EDU.UPC_BARCELONA", period: "2019 - 2020"},
    {img: "./assets/images/education/pisa.png", translateKey: "EDU.PISA", period: "2021"},
    {img: "./assets/images/education/girlsday.png", translateKey: "EDU.GIRLSDAY", period: "2019 / 2021"},
  ];

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;
    const workElement = document.getElementById('work');
    const skillElement = document.getElementById('skills');
    if (workElement && skillElement) {
      this.workpageHeight = workElement.offsetHeight;
      this.skillpageHeight = skillElement.offsetHeight;
    }

    const startTitleAnimation = this.innerHeight + this.workpageHeight + (this.skillpageHeight * 0.4);
    const endTitleAnimation = this.innerHeight + this.workpageHeight + (this.skillpageHeight * 0.65);
    this.animationService.animateTitleToSwipeIn(scrollPosition, startTitleAnimation, endTitleAnimation, 'school-title');

    const startAnimation = this.innerHeight + this.workpageHeight + (this.skillpageHeight * 0.6);
    const endAnimation = this.innerHeight + this.workpageHeight + (this.skillpageHeight * 0.8);
    this.animationService.animateElementsOpacity(scrollPosition, startAnimation, endAnimation, '.carousel-item');

    if (scrollPosition < startTitleAnimation) {
      this.displayedSlide = undefined;
    }
  }


  public displaySlideDetails(slide: {img: string, translateKey:string, period:string}, index: number) {
    this.displayedSlide = undefined;
    this.displayedSlide = {...slide, index};
  }

}
