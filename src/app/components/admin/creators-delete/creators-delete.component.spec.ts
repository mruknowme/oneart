import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorsDeleteComponent } from './creators-delete.component';

describe('CreatorsDeleteComponent', () => {
  let component: CreatorsDeleteComponent;
  let fixture: ComponentFixture<CreatorsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
