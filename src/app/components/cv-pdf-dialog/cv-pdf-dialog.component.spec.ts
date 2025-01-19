import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPdfDialog } from './cv-pdf-dialog.component';

describe('CvPdfModalComponent', () => {
  let component: CvPdfDialog;
  let fixture: ComponentFixture<CvPdfDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvPdfDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvPdfDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
