import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsPresenterComponent } from './lists-presenter.component';

describe('ListsPresenterComponent', () => {
  let component: ListsPresenterComponent;
  let fixture: ComponentFixture<ListsPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsPresenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
