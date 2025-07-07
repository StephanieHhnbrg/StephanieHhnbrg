import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticlesComponent } from './blog-articles.component';

describe('BlogArticlesComponent', () => {
  let component: BlogArticlesComponent;
  let fixture: ComponentFixture<BlogArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
