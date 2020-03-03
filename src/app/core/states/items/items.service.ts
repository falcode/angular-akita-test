import { Injectable } from '@angular/core';
import { ItemsStore } from './items.store';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Item } from '@app/core/interfaces/items';
import { arrayAdd, arrayRemove } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemsURL = 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/items.json';

  constructor(private itemsStore: ItemsStore, private http: HttpClient) { }

  get() {
    return this.http.get<any>(this.itemsURL).pipe(
      map(entities => this.generateID(entities.items)),
      tap(entities => this.itemsStore.update({items: entities}))
      );
  }

  /**
   * Add an ID to every object on the array
   * @param Item[] item list
   */
  generateID = (items: Item[]): any => items.map((item, i) => ({ id: i++, ...item }));

  updateItems(items: Item[]) {
    this.itemsStore.update(({items}));
  }

  updateItemsToDisplay(sumOrDel: boolean) {
    this.itemsStore.update(state => ({
      itemsToDisplay: sumOrDel ? state.itemsToDisplay + 5 : state.itemsToDisplay - 5
    }));
  }

  addFavItem(item: Item) {
    this.itemsStore.update(state => ({
      favItems: arrayAdd(state.favItems, item)
    }));
  }

  updateSortBy(key: string) {
    this.itemsStore.update(() => ({
      sortBy: key
    }));
  }

  updateSearchBy(key: string) {
    this.itemsStore.update(() => ({
      searchBy: key
    }));
  }

  updateSearchFavBy(key: string) {
    this.itemsStore.update(() => ({
      searchFavBy: key
    }));
  }
  removeFavItem(item: Item) {
    this.itemsStore.update(state => ({
      favItems: arrayRemove(state.favItems, [item.id])
    }));
  }

}
