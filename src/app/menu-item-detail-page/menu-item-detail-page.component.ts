import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuServiceService } from '../service/menu-service.service';
import { RestaurantMenuItem } from '../model/menu-item';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RecommendationService } from '../service/recommendation.service';

@Component({
  selector: 'app-menu-item-detail-page',
  standalone: true,
  imports: [StarRatingComponent, CommonModule, MatChipsModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './menu-item-detail-page.component.html',
  styleUrl: './menu-item-detail-page.component.css'
})
export class MenuItemDetailPageComponent implements OnInit {

  RestMenuItem!: RestaurantMenuItem;
  dislikeDisabled: boolean = false;
  likeDisabled: boolean = false;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getRestaurantMenuItem();
  }

  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuServiceService, private router: Router
    , private recommendService: RecommendationService) { }

  getRestaurantMenuItem(): void {
    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.menuService.getTheMenuItem(menuItemId)
      .subscribe(data => {
        this.RestMenuItem = data;
        console.log(this.RestMenuItem);
      });
  }

  navigateRestaurant(restaurantId: number) {
    this.router.navigate(['/detail-page/', restaurantId]);
  }

  likeClicked() {
    this.dislikeDisabled = true;
    this.likeDisabled = false;

    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    const username: string | null = localStorage.getItem("username");
    const usernameString: string = username ? username.toString() : '';
    this.recommendService.recommendMenuItem(menuItemId, true, usernameString)
      .subscribe(data => {
        // this.RestMenuItem = data;
        this.getRestaurantMenuItem();
        console.log(data);
      });
  }

  dislikeClicked() {
    // Your dislike logic here
    this.likeDisabled = true;
    this.dislikeDisabled = false;

    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    const username: string | null = localStorage.getItem("username");
    const usernameString: string = username ? username.toString() : '';
    this.recommendService.recommendMenuItem(menuItemId, false, usernameString)
      .subscribe(data => {
        // this.RestMenuItem = data;
        this.getRestaurantMenuItem();
        console.log(data);
      });
  }

}
