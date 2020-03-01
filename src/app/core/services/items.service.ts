import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private itemsURL = 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/items.json';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Gets all the list of items
   */
  getItems = (): Observable<any> => this.http.get<any>(this.itemsURL);

}
