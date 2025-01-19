import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldPageComponent } from './old-page.component';

describe('HomePageComponent', () => {
  let component: OldPageComponent;
  let fixture: ComponentFixture<OldPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
