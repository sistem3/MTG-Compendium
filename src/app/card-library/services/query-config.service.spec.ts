import { TestBed } from '@angular/core/testing';

import { QueryConfigService } from './query-config.service';

describe('QueryConfigService', () => {
  let service: QueryConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
