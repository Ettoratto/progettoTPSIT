import { TestBed } from '@angular/core/testing';

import { AddEditUserService } from './add-edit-user.service';

describe('AddEditUserService', () => {
  let service: AddEditUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEditUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
