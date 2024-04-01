import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { heroes } from '../../data/homeitems';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  heroes = heroes;

  restaurants! : Restaurant[];
  
  constructor(private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService, private router : Router) {
  }

  ngOnInit() {
    this.restaurantService.getRestaurants()
        .subscribe( data => {
          this.restaurants = data;
        });
        console.log(this.restaurants);
  }

  moveRestaurantPage(restId : number) {
    this.router.navigate(['/detail-page/', restId]);
  }

  

}
