import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuServiceService } from '../service/menu-service.service';
import { RestaurantMenuItem } from '../model/menu-item';

@Component({
  selector: 'app-menu-item-detail-page',
  standalone: true,
  imports: [StarRatingComponent, CommonModule],
  templateUrl: './menu-item-detail-page.component.html',
  styleUrl: './menu-item-detail-page.component.css'
})
export class MenuItemDetailPageComponent implements OnInit {

  menuItem!: RestaurantMenuItem;

  ngOnInit() {
    window.scrollTo(0,0);
    localStorage.setItem("1","12");
  }

  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuServiceService){}

  getRestaurantMenuItem(): void {
    const restaurantId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.menuService.getTheMenuItem(restaurantId)
      .subscribe(data => {
        this.menuItem = data;
        console.log(this.menuItem);
      });
  }
  
}
