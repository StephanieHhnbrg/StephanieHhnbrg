import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationPageComponent } from './animation-page.component';

describe('HomePageComponent', () => {
  let component: AnimationPageComponent;
  let fixture: ComponentFixture<AnimationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
