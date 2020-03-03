import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Item } from '@app/core/interfaces/items';

export interface ItemsState {
   items: Item[];
   favItems: Item[];
   itemsToDisplay: number;
   sortBy: string;
   searchBy: string;
   searchFavBy: string;
}

export function createInitialState(): ItemsState {
  return {
    items: [],
    favItems: [],
    itemsToDisplay: 5,
    sortBy: '',
    searchBy: '',
    searchFavBy: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'items' })
export class ItemsStore extends Store<ItemsState> {

  constructor() {
    super(createInitialState());
  }



}

