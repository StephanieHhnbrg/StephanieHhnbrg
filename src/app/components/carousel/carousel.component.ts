import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  @Input() public highlightedItemIndex = -1;
  @Input() public slides: {img: string, translateKey:string, period:string}[] = [];
  @Output() public carouselItemClicked = new EventEmitter<number>();

  public clickOnCarouselItem(index: number) {
    this.highlightedItemIndex = index;
    this.carouselItemClicked.next(index);
  }



}
