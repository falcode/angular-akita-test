import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemListComponent } from './item-list.component';
import { ItemComponent } from '../item/item.component';

@NgModule({
  declarations: [ItemListComponent, ItemComponent],
  imports: [
    CommonModule,

  ],
  exports: [ItemListComponent]
})
export class ItemListModule { }
