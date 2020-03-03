import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ItemsStore, ItemsState } from './items.store';

@Injectable({ providedIn: 'root' })
export class ItemsQuery extends Query<ItemsState> {
  items$ = this.select('items');
  favItems$ = this.select('favItems');
  itemsToDisplay$ = this.select('itemsToDisplay');
  sortBy$ = this.select('sortBy');
  searchBy$ = this.select('searchBy');
  searchFavBy$ = this.select('searchFavBy');

  constructor(protected store: ItemsStore) {
    super(store);
  }
  getItems = () => this.store.getValue().items;
  getFavItems = () => this.store.getValue().favItems;
  getItemsToSee = () => this.store.getValue().itemsToDisplay;



}
