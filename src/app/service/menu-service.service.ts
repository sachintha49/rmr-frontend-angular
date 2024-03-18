import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../model/menuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor(private http: HttpClient) { }
  
  public getMenuAllItems() {
    return this.http.get<MenuItem[]>('http://localhost:8080/menus/items');
  };
}
