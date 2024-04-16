import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../model/raring';
import { MenuItemComment } from '../model/menuItemComment';

const httpOptions = {
  headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
  };
  
@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http: HttpClient) { }

  //Recommend Menu Item
  public recommendMenuItem(menuItemId: number, isRecommend: boolean, username: string) {
    const url = `http://localhost:8080/recommend/${menuItemId}?username=${username}`;
    return this.http.post(url, isRecommend, httpOptions);
  }

  //Rate Menu Item
  public rateMenuItem(menuItemId: number, rate: number, username: string) {
    const url = `http://localhost:8080/rate/${menuItemId}?username=${username}`;
    return this.http.post(url, rate, httpOptions);
  }

  //Review Menu Item
  public reviewMenuItem(menuItemId: number, review: String, username: string) {
    const url = `http://localhost:8080/review/${menuItemId}?username=${username}`;
    return this.http.post(url, review, httpOptions);
  }



  /* get rate according to the user */
  public getUserRateMenuItem(menuItemId: number,username: string){
    const url = `http://localhost:8080/rate/${menuItemId}?username=${username}`;
    return this.http.get<Rating>(url, httpOptions);
  }

  /* get rate according to the user */
  public getRecommendMenuItem(menuItemId: number,username: string){
    const url = `http://localhost:8080/recommend/${menuItemId}?username=${username}`;
    return this.http.get<Rating>(url, httpOptions);
  }

  /* get all review comments according to the menu item */
  public getAllReviewCommentsAccordingToMenuItem(menuItemId: number){
    const url = `http://localhost:8080/review/${menuItemId}`;
    return this.http.get<MenuItemComment[]>(url, httpOptions);
  }
}
