import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  public recommendMenuItem(menuItemId: number, isRecommend: boolean, username: string) {
    const url = `http://localhost:8080/recommend/${menuItemId}?username=${username}`;
    return this.http.post(url, isRecommend, httpOptions);
  }
}
