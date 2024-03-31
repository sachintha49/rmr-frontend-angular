import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [FontAwesomeModule, StarRatingComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent implements OnInit {
  id!: number;
  restaurant: Restaurant = new Restaurant();
  faCoffee = faCoffee;
  //comment : Comment = new Comment();
  //comments : Comment;

  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.getRestaurant();
  }

  onRatingChange(value : number){
    console.log(value);
  }

  getRestaurant(): void {
    const restaurantId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.restaurantService.getRestaurantById(restaurantId)
      .subscribe(data => {
        this.restaurant = data;
      });
  }

}
