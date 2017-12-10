import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresDeleteComponent } from './genres-delete.component';

describe('GenresDeleteComponent', () => {
  let component: GenresDeleteComponent;
  let fixture: ComponentFixture<GenresDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
