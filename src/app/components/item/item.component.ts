import { Component, OnInit, Input } from '@angular/core';
import { Item } from '@app/core/interfaces/items';
import { ItemsQuery } from '@app/core/states/items/items.query';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { arrayFind } from '@datorama/akita';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  favItem$: Observable<Item> = null;
  private destroySubject$: Subject<void> = new Subject();
  constructor(private itemsQuery: ItemsQuery) {
  }

  ngOnInit() {
    this.favItem$ = this.itemsQuery.select('favItems')
      .pipe(takeUntil(this.destroySubject$), arrayFind(this.item.id));
  }
  /**
   * Add the three dots to a long text
   * @param string text to delimite
   */
  readMore = (text: string) => text.length > 110 ? `${text.slice(0, 110)}...` : text;

}
