import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsBuyComponent } from './requests-buy.component';

describe('RequestsBuyComponent', () => {
  let component: RequestsBuyComponent;
  let fixture: ComponentFixture<RequestsBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
