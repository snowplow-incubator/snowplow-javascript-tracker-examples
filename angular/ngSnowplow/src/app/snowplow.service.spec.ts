import { TestBed } from '@angular/core/testing';

import { SnowplowService } from './snowplow.service';
import { WindowRef } from './window-ref';

describe('SnowplowService', () => {
  let service: SnowplowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WindowRef
      ]
    });
    service = TestBed.inject(SnowplowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
