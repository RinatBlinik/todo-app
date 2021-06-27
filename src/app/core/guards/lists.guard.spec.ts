import { TestBed } from '@angular/core/testing';

import { ListsGuard } from './lists.guard';

describe('ListsGuard', () => {
  let guard: ListsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ListsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
