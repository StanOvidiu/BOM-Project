import { TestBed } from '@angular/core/testing';

import { BindingSocketServiceService } from './binding-socket-service.service';

describe('BindingSocketServiceService', () => {
  let service: BindingSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BindingSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
