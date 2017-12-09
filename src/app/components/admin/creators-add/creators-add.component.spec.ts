import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorsAddComponent } from './creators-add.component';

describe('CreatorsAddComponent', () => {
  let component: CreatorsAddComponent;
  let fixture: ComponentFixture<CreatorsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
