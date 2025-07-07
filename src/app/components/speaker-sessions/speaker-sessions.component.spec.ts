import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSessionsComponent } from './speaker-sessions.component';

describe('SpeakerSessionsComponent', () => {
  let component: SpeakerSessionsComponent;
  let fixture: ComponentFixture<SpeakerSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerSessionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
