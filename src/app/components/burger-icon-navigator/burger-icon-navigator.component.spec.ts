import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerIconNavigatorComponent } from './burger-icon-navigator.component';

describe('BurgerIconNavigatorComponent', () => {
  let component: BurgerIconNavigatorComponent;
  let fixture: ComponentFixture<BurgerIconNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerIconNavigatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgerIconNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
