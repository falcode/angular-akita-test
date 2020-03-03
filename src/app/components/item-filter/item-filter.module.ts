import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFilterComponent } from './item-filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemFilterComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ItemFilterComponent]
})
export class ItemFilterModule { }
