import { TestBed, inject } from '@angular/core/testing';

import { ListordersService } from './listorders.service';

describe('ListordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListordersService]
    });
  });

  it('should be created', inject([ListordersService], (service: ListordersService) => {
    expect(service).toBeTruthy();
  }));
});
