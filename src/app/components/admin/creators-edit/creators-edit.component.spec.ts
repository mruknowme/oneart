import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorsEditComponent } from './creators-edit.component';

describe('CreatorsEditComponent', () => {
  let component: CreatorsEditComponent;
  let fixture: ComponentFixture<CreatorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
