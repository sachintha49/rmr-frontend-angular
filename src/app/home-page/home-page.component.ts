import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { heroes } from '../../data/homeitems';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MenuServiceService } from '../service/menu-service.service';
import { MenuItem } from '../model/menuItem';

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
  menuItems! : any[];
  
  constructor(private activatedRoute: ActivatedRoute,
               private restaurantService: RestaurantService,
               private router : Router,
              private menuService : MenuServiceService) {
  }

  ngOnInit() {
    this.restaurantService.getRestaurants()
        .subscribe( data => {
          this.restaurants = data;
        });
        console.log(this.restaurants);
        this.getAllMenuItems();
  }

  moveRestaurantPage(restId : number) {
    this.router.navigate(['/detail-page/', restId]);
  }

  moveMenuItemPage(MenuItemId : number) {
    this.router.navigate(['/menu-item-detail/', MenuItemId]);
  }

  getAllMenuItems() {
    this.menuService.getRestaurantMenuAllItems()
        .subscribe( data => {
          this.menuItems = data;
          console.log(this.menuItems)
        });
  }

  

}
