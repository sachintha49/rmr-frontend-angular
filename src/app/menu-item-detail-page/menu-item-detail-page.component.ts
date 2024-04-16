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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Rating } from '../model/raring';
import { MenuItemComment } from '../model/menuItemComment';

@Component({
  selector: 'app-menu-item-detail-page',
  standalone: true,
  imports: [StarRatingComponent, CommonModule, MatChipsModule, MatButtonModule, MatIconModule, MatDividerModule, FormsModule,
    ReactiveFormsModule],
  templateUrl: './menu-item-detail-page.component.html',
  styleUrl: './menu-item-detail-page.component.css'
})
export class MenuItemDetailPageComponent implements OnInit {

  RestMenuItem!: RestaurantMenuItem;
  ratingUser!: number;
  dislikeDisabled: boolean = false;
  likeDisabled: boolean = false;
  menuItemCommentList: MenuItemComment[] = [];

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('')
  })

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getRestaurantMenuItem();
    this.getRatingAccordingToUser();
    this.getRecommendationAccordingToUser();
    this.getAllReviewCommentsAccordingToMenuItem();
  }

  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuServiceService, private router: Router
    , private recommendService: RecommendationService) { }

  getRestaurantMenuItem(): void {
    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.menuService.getTheMenuItem(menuItemId)
      .subscribe(data => {
        this.RestMenuItem = data;
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
        this.getRecommendationAccordingToUser();
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
        this.getRecommendationAccordingToUser();
      });
  }

  /* Get Rating According to the user */
  getRecommendationAccordingToUser() {
    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    const username: string | null = localStorage.getItem("username");
    const usernameString: string = username ? username.toString() : '';
    this.recommendService.getRecommendMenuItem(menuItemId, usernameString)
      .subscribe(data => {
        if (data && data.recommend != null) {
          if (data.recommend == true) {
            this.dislikeDisabled = true;
            this.likeDisabled = false;
          }

          if (data.recommend == false) {
            this.dislikeDisabled = false;
            this.likeDisabled = true;
          }
        }
      });
  }

  onRatingChange(value: number) {
    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    const username: string | null = localStorage.getItem("username");
    const usernameString: string = username ? username.toString() : '';
    this.recommendService.rateMenuItem(menuItemId, value, usernameString)
      .subscribe(data => {
        // this.RestMenuItem = data;
        this.getRestaurantMenuItem();
        this.getRatingAccordingToUser();
      });
  }

  /* Get Rating According to the user */
  getRatingAccordingToUser() {
    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    const username: string | null = localStorage.getItem("username");
    const usernameString: string = username ? username.toString() : '';
    this.recommendService.getUserRateMenuItem(menuItemId, usernameString)
      .subscribe(data => {
        this.ratingUser = data.rate;
      });
  }

  sendComment() {
    let newComment = this.commentForm.value.comment;

    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    const username: string | null = localStorage.getItem("username");
    const usernameString: string = username ? username.toString() : '';
    this.recommendService.reviewMenuItem(menuItemId, newComment, usernameString)
      .subscribe(data => {
        // this.RestMenuItem = data;
        this.getRestaurantMenuItem();
        this.commentForm.get('comment')?.reset('');
        this.getAllReviewCommentsAccordingToMenuItem();
      });
  }

  /* Get all review comments According to the menu item */
  getAllReviewCommentsAccordingToMenuItem() {
    const menuItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.recommendService.getAllReviewCommentsAccordingToMenuItem(menuItemId)
      .subscribe(data => {
        this.menuItemCommentList = data;
        console.log(this.menuItemCommentList)
      });
  }

}
