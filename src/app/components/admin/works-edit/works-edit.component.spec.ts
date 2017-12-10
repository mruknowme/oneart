import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksEditComponent } from './works-edit.component';

describe('WorksEditComponent', () => {
  let component: WorksEditComponent;
  let fixture: ComponentFixture<WorksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
