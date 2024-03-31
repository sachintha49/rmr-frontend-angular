import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { MenuServiceService } from '../service/menu-service.service';
import { RestaurantMenuItem } from '../model/menu-item';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [FontAwesomeModule, StarRatingComponent, CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent implements OnInit {

  id!: number;
  restaurant: Restaurant = new Restaurant();
  faCoffee = faCoffee;
  restOwner: string = "";
  menuItemsList: RestaurantMenuItem[] = [];
  //comment : Comment = new Comment();
  //comments : Comment;

  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, 
    private menuService: MenuServiceService, private router: Router) { }

  ngOnInit() {
    
    this.getRestaurant();
    this.getRestaurantMenuItems();
  }

  onRatingChange(value : number){
    console.log(value);
  }

  getRestaurant(): void {
    const restaurantId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.restaurantService.getRestaurantById(restaurantId)
      .subscribe(data => {
        this.restaurant = data;
        this.restOwner = data.user?.firstName || '';
      });
  }

  getRestaurantMenuItems(): void {
    const restaurantId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.menuService.getMenuItemsAccordingToRestaurantId(restaurantId)
      .subscribe(data => {
        this.menuItemsList = data;
      });
  }

  navigateMenuItem(menuItemId : number){
    
    this.router.navigate(['/menu-item-detail/', menuItemId]);
  }

}
