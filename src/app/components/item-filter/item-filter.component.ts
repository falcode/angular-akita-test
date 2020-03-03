import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ItemsQuery } from '@app/core/states/items/items.query';
import { Subject } from 'rxjs';
import { ItemsService } from '@app/core/states/items/items.service';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements OnInit {
  itemKeys = ['title', 'description', 'price', 'email'];
  itemsLength = 0;
  selected: string;
  itemsToSee: number;
  private destroySubject$: Subject<void> = new Subject();

  constructor(public itemsQuery: ItemsQuery, private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsQuery.items$.pipe(takeUntil(this.destroySubject$))
    .subscribe(val => this.itemsLength = val.length);

    this.itemsQuery.itemsToDisplay$.pipe(takeUntil(this.destroySubject$))
    .subscribe(val => this.itemsToSee = val);

  }

  seeMoreItems() {
    if (!(this.itemsLength <= this.itemsToSee)){
      this.itemsService.updateItemsToDisplay(true);
    }
  }
  seeLessItems() {
    if (this.itemsToSee > 5) {
      this.itemsService.updateItemsToDisplay(false);
    }
  }


}
