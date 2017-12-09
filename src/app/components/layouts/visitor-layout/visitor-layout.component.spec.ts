import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorLayoutComponent } from './visitor-layout.component';

describe('VisitorLayoutComponent', () => {
  let component: VisitorLayoutComponent;
  let fixture: ComponentFixture<VisitorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
