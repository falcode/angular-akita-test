import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemsQuery } from '@app/core/states/items/items.query';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Item } from '@app/core/interfaces/items';
import { ItemsService } from '@app/core/states/items/items.service';

@Component({
  selector: 'app-item-fav-modal',
  templateUrl: './item-fav-modal.component.html',
  styleUrls: ['./item-fav-modal.component.scss']
})
export class ItemFavModalComponent implements OnInit, OnDestroy {
  private destroySubject$: Subject<void> = new Subject();
  public favItems: Item[] = [];
  public searchFavItems: Item[] = [];

  constructor(
    public itemsQuery: ItemsQuery,
    public itemsService: ItemsService,
    public dialogRef: MatDialogRef<ItemFavModalComponent>
    ) {}
    ngOnInit() {
      this.itemsQuery.favItems$.pipe(takeUntil(this.destroySubject$))
      .subscribe(val => {
        val.length ? this.favItems = val : this.dialogRef.close();
        this.searchFavItems = val;
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    searchBy = (text: string) => {
      return !text ? this.searchFavItems = this.favItems :
      this.searchFavItems = this.favItems.filter(item => 
        item.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(text));
    }

    ngOnDestroy(): void {
      this.destroySubject$.next();
      this.destroySubject$.complete();
    }
  }
