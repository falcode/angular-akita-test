import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ItemsService = TestBed.get(ItemsService);
    expect(service).toBeTruthy();
  });
});
