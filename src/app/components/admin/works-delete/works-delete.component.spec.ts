import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksDeleteComponent } from './works-delete.component';

describe('WorksDeleteComponent', () => {
  let component: WorksDeleteComponent;
  let fixture: ComponentFixture<WorksDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
