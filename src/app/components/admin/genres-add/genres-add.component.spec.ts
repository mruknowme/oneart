import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresAddComponent } from './genres-add.component';

describe('GenresAddComponent', () => {
  let component: GenresAddComponent;
  let fixture: ComponentFixture<GenresAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
