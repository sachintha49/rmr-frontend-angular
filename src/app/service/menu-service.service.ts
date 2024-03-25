import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../model/menuItem';
import { RestaurantMenuItem } from '../model/menu-item';

const httpOptions = {
  headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
  };
  
@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor(private http: HttpClient) { }
  
  public getMenuAllItems() {
    return this.http.get<MenuItem[]>('http://localhost:8080/menus/items');
  };

  public addMenuItem(menuItem : MenuItem) {
    return this.http.post<MenuItem>('http://localhost:8080/menus/' + menuItem.restaurantId, menuItem, httpOptions);
  };

  public getMenuItemsAccordingToRestaurantId(restaurantId: number) {
    return this.http.get<RestaurantMenuItem[]>('http://localhost:8080/menus/' + restaurantId);
  };
}
