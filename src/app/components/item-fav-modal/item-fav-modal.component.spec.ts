import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemFavModalComponent } from './item-fav-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemsQuery } from '@app/core/states/items/items.query';
import { of } from 'rxjs';

const favItemsService = {
  favItems$() {
    const todos = [{
      id: 1,
      title: 'test',
      description: 'test',
      price: 10,
      email: 'test@wallapop.com',
      image: 'test'
    }];
    return of( todos );
  }
};
let itemQuery: jasmine.SpyObj<ItemsQuery>;

describe('ItemFavModalComponent', () => {
  let component: ItemFavModalComponent;
  let fixture: ComponentFixture<ItemFavModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFavModalComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ItemsQuery, useValue: jasmine.createSpyObj('ItemsQuery', ['select']) }
    ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFavModalComponent);
    component = fixture.componentInstance;
    itemQuery = TestBed.get(ItemsQuery);
    fixture.detectChanges();
  });

  xit('should create', () => {
    (itemQuery as any).favItems$ = of({
      id: 1,
      title: 'test',
      description: 'test',
      price: 10,
      email: 'test@wallapop.com',
      image: 'test'
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
