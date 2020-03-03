import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../core/states/items/items.service';
import { Item } from '@app/core/interfaces/items';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ItemsQuery } from '@app/core/states/items/items.query';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public itemsToSee: number;
  items: Item[] = [];
  private destroySubject$: Subject<void> = new Subject();

  constructor(
    public itemsQuery: ItemsQuery,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.get().pipe(takeUntil(this.destroySubject$)).subscribe(val => this.items = val);
    this.itemsQuery.sortBy$.pipe().subscribe(
      value => this.sortByPropertie(value)
    );
    this.itemsQuery.searchBy$.pipe().subscribe(
      value => this.items = this.transform(this.items, value)
    );
    this.itemsQuery.itemsToDisplay$.pipe(takeUntil(this.destroySubject$))
      .subscribe(val => this.itemsToSee = val);

  }


  /**
   * Add or delete items on fav item list
   * @param newItem new item to add or delete
   */
  addOrDelFavItems = (newItem: Item) =>
    this.itemsQuery.getFavItems().find(item => item.id === newItem.id) ?
      this.itemsService.removeFavItem(newItem) : this.itemsService.addFavItem(newItem)


  sortByPropertie = (key: string) => {
    if (key === 'price') {
      return this.items.sort((a, b) => a.price - b.price);
    } else {
      return this.items.sort((a, b) => a[key].localeCompare(b[key]));
    }
  }

  transform(values: Item[], filter: string): Item[] {
    if (!values || !values.length) { return []; }
    if (!filter) { return values; }
    return values.filter(v => {
        let match = false;

        Object.keys(v).forEach(k => {
            if (typeof v[k] === 'string') {
                match = match || v[k].indexOf(filter) >= 0;
            } else {
                match = match || v[k] === filter; // == intentinally
            }
        });

        return match;
    });
}
}
