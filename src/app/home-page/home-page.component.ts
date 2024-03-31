import { Component, OnInit } from '@angular/core';
import { heroes } from '../../data/homeitems';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantMenuItem } from '../model/menu-item';
import { MenuServiceService } from '../service/menu-service.service';
import { TableElement } from '../model/menuItemTableData';
import { MatTableDataSource } from '@angular/material/table';
import { RestaurantService } from '../service/restaurant.service';
import { Restaurant } from '../model/restaurant';
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
    console.log("click una" + restId);
    this.router.navigate(['/detail-page/', restId]);
  }

  

}
