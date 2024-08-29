import {Component, HostListener, OnInit} from '@angular/core';
import { Work } from '../../data/work.data';
import {AnimationService} from "../../services/animation.service";

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrl: './work-page.component.css',
})
export class WorkPageComponent implements OnInit {
  private innerHeight: any;


  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  public workData: {work: Work, isExpanded: boolean}[] = [
    {work: {company: "Accenture", position: "Custom Application Engineer", projects: [{start:"09/2023", end:"08/2024", location:"Berlin", name:"Digital agent", description: "Desc"}]}, isExpanded: true},
    {work: {company: "Capgemini", position: "Senior Software Engineer", projects: [{start:"03/2023", end:"08/2023", location:"Berlin", name:"Date management system", description: "Desc"}]}, isExpanded: true},
    {work: {company: "Netlight", position: "Associate IT Consultant", projects: [{start:"10/2021", end:"09/2022", location:"Berlin", name: "Neo banking app for trading stocks, ETFs and crypto", description: "Desc"}]}, isExpanded: true},
    {work: {company: "adesso", position: "Student Software Engineer", projects: [
      {start:"04/2020", end:"04/2021", location:"Berlin", name: "Responsive platform for musical composer, lyricists and music publishers", description: "Desc"},
      {start:"09/2019", end:"01/2020", location:"Barcelona", name: "Modernization of an information system for the swiss employment agency", description: "Desc"},
      {start:"10/2018", end:"08/2019", location:"Berlin", name: "Responsive platform for musical composer, lyricists and music publishers", description: "Desc"},
      {start:"10/2016", end:"10/2017", location:"Dortmund", name: "Administration platform for tenders and awarding authorities", description: "Desc"},
      ]}, isExpanded: false},
    {work: {company: "Materna", position: "Student Software Developer", projects: [{start:"02/2015", end:"06/2016", location:"Dortmund", name: "GUI-based explorer tool for using DPWS (Devices Profile for Web-Services)", description: "Desc"}]}, isExpanded: false}
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;

    const startAnimation = this.innerHeight * 0.4;
    const endAnimation = this.innerHeight * 0.8;
    this.animationService.animateTitleToSwipeIn(scrollPosition, startAnimation, endAnimation, 'work-title');

    const startTileAnimation = this.innerHeight * 0.7;
    const endTileAnimation = this.innerHeight * 0.95;
    this.animationService.animateElementsVisibility(scrollPosition, startTileAnimation, endTileAnimation, '.work-row');
  }


}
