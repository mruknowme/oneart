import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsBuyAddComponent } from './requests-buy-add.component';

describe('RequestsBuyAddComponent', () => {
  let component: RequestsBuyAddComponent;
  let fixture: ComponentFixture<RequestsBuyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsBuyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsBuyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
