import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-burger-icon-navigator',
  templateUrl: './burger-icon-navigator.component.html',
  styleUrl: './burger-icon-navigator.component.css'
})
export class BurgerIconNavigatorComponent  implements OnInit, OnDestroy{

  public active: "articles" | "talks" | "certs" = "articles";

  private subscriptions: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscriptions.push(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects.replace('/', '');
      if (url === "articles" || url === "talks" || url === "certs") {
        this.active = url;
      }
    }));
  }

  public navigateTo(route: "articles" | "talks" | "certs") {
    this.active = route;
    this.router.navigate([route], {});
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

}
