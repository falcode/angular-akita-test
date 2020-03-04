import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFilterComponent } from './item-filter.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemFavModalComponent } from '../item-fav-modal/item-fav-modal.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [ItemFilterComponent, ItemFavModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatCardModule

  ],
  exports: [ItemFilterComponent],
  entryComponents: [ItemFavModalComponent]
})
export class ItemFilterModule { }
