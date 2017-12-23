import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsBuyEditComponent } from './requests-buy-edit.component';

describe('RequestsBuyEditComponent', () => {
  let component: RequestsBuyEditComponent;
  let fixture: ComponentFixture<RequestsBuyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsBuyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsBuyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
