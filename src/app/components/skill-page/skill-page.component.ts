import {Component, HostListener, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-skill-page',
  templateUrl: './skill-page.component.html',
  styleUrl: './skill-page.component.css'
})
export class SkillPageComponent implements OnInit {
  private innerHeight = 0;
  private workpageHeight = 0;


  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  public technologies: string[] = [
    "java.png",
    "kotlin.jpeg",
    "python.png",
    "spring.png",
    "rest.png",
    "rabbitmq.png",
    "kafka.png",
    "sql.png",
    "aws.svg",
    "angular.png",
    "typescript.png",
    "html.png",
    "css.png",
    "docker.png",
    "kubernetes.png",
    "helm.svg",
    "rancher.png",
    "argocd.png",
    "ghactions.png",
    "jenkins.png",
    "grafana.webp",
    "kibana.png",
  ]

  public certificates: {name: string, url: string, img:string}[] = [
    {name:"AWS Certified Cloud Practitioner", url:"https://www.credly.com/badges/df96f506-44dd-4fec-b9c5-b2e14db4c042/public_url?trk=public_profile_see-credential", img:"tech-arch.png"},
    {name:"AWS Certified Cloud Practitioner", url:"https://catalog-education.oracle.com/pls/certview/sharebadge?id=4F2F922AFE64A5EA53E0CC10D63F0C535BC91D22A2C794A2E04402AC0FDE1B13", img:"java.png"},
    {name:"AWS Certified Cloud Practitioner", url:"https://credly.com/badges/285f96af-46f8-4afb-abfe-e1f4c29a775b/public_url?trk=public_profile_see-credential", img:"aws.png"},
    {name:"AWS Certified Cloud Practitioner", url:"https://www.credly.com/badges/acd4fd08-1b77-4666-bfd4-0726feee8a76/public_url", img:"aws-tech.png"},
    {name:"AWS Certified Cloud Practitioner", url:"https://www.credly.com/badges/e6003fe9-c5cc-49b1-90b3-c0a597160d58/public_url", img:"aws-genai.png"},
    {name:"AWS Certified Cloud Practitioner", url:"https://credly.com/badges/22232565-1dd4-4c6b-8ee8-13d4eb534294/public_url", img:"scrum.png"},
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;
    const element = document.getElementById('work');
    if (element) {
      this.workpageHeight = element.offsetHeight;
    }

    const startTitleAnimation = this.innerHeight + (this.workpageHeight * 0.4);
    const endTitleAnimation = this.innerHeight + (this.workpageHeight * 0.65);
    this.animationService.animateTitleToSwipeIn(scrollPosition, startTitleAnimation, endTitleAnimation, 'skill-title');

    const startTileAnimation = this.innerHeight + (this.workpageHeight * 0.6);
    const endTileAnimation = this.innerHeight + (this.workpageHeight * 0.9);
    this.animationService.animateElementsVisibility(scrollPosition, startTileAnimation, endTileAnimation, '.img-container');

    const startCertTitleAnimation = this.innerHeight + (this.workpageHeight * 0.7);
    const endCertTitleAnimation = this.innerHeight + (this.workpageHeight * 0.8);
    this.animationService.animateTitleToSwipeIn(scrollPosition, startCertTitleAnimation, endCertTitleAnimation, 'cert-title');

    const startCertAnimation = this.innerHeight + (this.workpageHeight * 0.75);
    const endCertAnimation = this.innerHeight + (this.workpageHeight * 0.95);
    this.animationService.animateElementsOpacity(scrollPosition, startCertAnimation, endCertAnimation, '.certificate-panel');
  }



}
