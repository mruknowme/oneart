import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresEditComponent } from './genres-edit.component';

describe('GenresEditComponent', () => {
  let component: GenresEditComponent;
  let fixture: ComponentFixture<GenresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
