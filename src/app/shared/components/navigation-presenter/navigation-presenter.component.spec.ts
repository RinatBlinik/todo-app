import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPresenterComponent } from './navigation-presenter.component';

describe('NavigationPresenterComponent', () => {
  let component: NavigationPresenterComponent;
  let fixture: ComponentFixture<NavigationPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationPresenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
