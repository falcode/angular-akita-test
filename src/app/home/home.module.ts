import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ItemListModule } from '../components/item-list/item-list.module';
import { ItemFilterModule } from '@app/components/item-filter/item-filter.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ItemListModule,
    ItemFilterModule
  ]
})
export class HomeModule { }
