import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsContactComponent } from './requests-contact.component';

describe('RequestsContactComponent', () => {
  let component: RequestsContactComponent;
  let fixture: ComponentFixture<RequestsContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
