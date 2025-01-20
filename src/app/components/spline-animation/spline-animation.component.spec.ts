import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineAnimationComponent } from './spline-animation.component';

describe('HomePageComponent', () => {
  let component: SplineAnimationComponent;
  let fixture: ComponentFixture<SplineAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplineAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplineAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
