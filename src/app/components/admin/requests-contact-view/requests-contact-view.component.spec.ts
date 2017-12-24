import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsContactViewComponent } from './requests-contact-view.component';

describe('RequestsContactViewComponent', () => {
  let component: RequestsContactViewComponent;
  let fixture: ComponentFixture<RequestsContactViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsContactViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsContactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
