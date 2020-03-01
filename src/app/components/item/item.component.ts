import { Component, OnInit, Input } from '@angular/core';
import { Item } from '@app/core/interfaces/items';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() fav = false;
  constructor() { }

  ngOnInit() {
  }
  /**
   * Add the three dots to a long text
   * @param string text to delimite
   */
  readMore = (text: string) => text.length > 110 ? `${text.slice(0, 110)}...` : text;

}
