import { Component, OnInit } from '@angular/core';
import { ItemsService } from '@services/items.service';
import { Item } from '@app/core/interfaces/items';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public itemsToSee = 5;
  public items: Item[] = [];
  public favItems: Item[] = [];
  private destroySubject$: Subject<void> = new Subject();

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.getItems().pipe(takeUntil(this.destroySubject$))
      .subscribe(res => this.items = this.generateID(res.items));
  }

  /**
   * Add an ID to every object on the array
   * @param Item[] item list
   */
  generateID = (items: Item[]): Item[] => items.map((item, i) => ({ id: i++, ...item }));

  /**
   * Add or delete items on fav item list
   * @param newItem new item to add or delete
   */
  addOrDelFavItems(newItem: Item) {
    const index = this.favItems.indexOf(newItem);
    if (index > -1) {
      this.favItems.splice(index, 1);
    } else {
      this.favItems.push(newItem);
    }
  }

  /**
   * See if item is fav or not
   * @param itemID item to see if its fav or not
   */
  getFav = (itemID: number) => this.favItems.find(item => item.id === itemID);

  sortByPropertie = (key: string) => this.items.sort((a, b) => a[key] > b[key] ? 1 : -1);
}
