import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { Cuisine } from '../model/cuisine';
import { Facility } from '../model/facility';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  /* Save Restaurant */
  public addRestaurant(restaurant: Restaurant) {
    console.log(restaurant);
    return this.http.post<Restaurant>('http://localhost:8080/restaurants/create', restaurant, httpOptions);
  };

  public getCuisines() {
    return this.http.get<Cuisine[]>('http://localhost:8080/cuisines');
  };

  public getFacilities() {
    return this.http.get<Facility[]>('http://localhost:8080/facilities');
  };

  public getRestaurants() {
    return this.http.get<Restaurant[]>('http://localhost:8080/restaurants');
  };

  public getRestaurantById(id : number) {
    return this.http.get<Restaurant>('http://localhost:8080/restaurants/' + id);
  };
}
