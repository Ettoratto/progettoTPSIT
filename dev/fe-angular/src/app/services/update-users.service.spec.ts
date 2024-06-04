import { TestBed } from '@angular/core/testing';

import { UpdateUsersService } from './update-users.service';

describe('UpdateUsersService', () => {
  let service: UpdateUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
