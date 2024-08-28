import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  public getElementHeight(elementId: string): number {
    const element = document.getElementById(elementId);
    return element ? element.offsetHeight : 0;
  }

  public animateTitleToSwipeIn(scrollPosition: number, startAnimation: number, endAnimation: number, elementId: string) {
    const titleElement = document.getElementById(elementId);
    let opacity = 1;
    let translateX = 0;
    if (titleElement) {
      const progress = (scrollPosition - startAnimation) / (endAnimation - startAnimation);
      if (scrollPosition > startAnimation && scrollPosition < endAnimation) {
        opacity = progress;
        translateX = -200 + ( 200 * progress);
      } else if (scrollPosition < startAnimation) {
        opacity = 0;
        translateX = -200;
      }
      titleElement.style.opacity = opacity.toString();
      titleElement.style.transform = `translateX(${translateX}px)`;
    }
  }

  public animateElementsVisibility(scrollPosition: number, startAnimation: number, endAnimation: number, elementSelector: string) {
    const elements = document.querySelectorAll<HTMLElement>(elementSelector);
    let displayTiles = elements.length;
    if (elements.length>0) {
      const progress = (scrollPosition - startAnimation) / (endAnimation - startAnimation);
      if (scrollPosition > startAnimation && scrollPosition < endAnimation) {
        displayTiles = elements.length * progress;
      } else if (scrollPosition < startAnimation) {
        displayTiles = 0;
      }

      for (let i = 0; i < elements.length; i++) {
        let el: HTMLElement = elements[i];
        if (el) {
          el.style.visibility = i >= displayTiles ? "hidden" : "visible";
        }
      }
    }
  }

  public animateElementsOpacity(scrollPosition: number, startAnimation: number, endAnimation: number, elementSelector: string) {
    const elements = document.querySelectorAll<HTMLElement>(elementSelector);
    let displayTiles = elements.length;
    let opacity = 1;
    console.log("opacity:"+elements.length);
    if (elements.length>0) {
      const progress = (scrollPosition - startAnimation) / (endAnimation - startAnimation);
      if (scrollPosition > startAnimation && scrollPosition < endAnimation) {
        displayTiles = elements.length * progress;
      } else if (scrollPosition < startAnimation) {
        displayTiles = 0;
        opacity = 0;
      }

      for (let i = 0; i < elements.length; i++) {
        let el: HTMLElement = elements[i];
        if (el) {
          if (displayTiles > 0 && displayTiles < elements.length) {
            opacity = progress < 0.8 ? progress * ((displayTiles-i)/displayTiles): progress;
          }
          el.style.opacity = i >= displayTiles ? "0" : opacity.toString();
        }
      }
    }
  }
}
