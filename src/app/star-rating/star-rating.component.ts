import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  faStar = faStar;

  @Input() rating = 0;
  @Input() readonly: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  setRating(value : number){
    if(this.readonly) return;

    this.rating = value;
    this.ratingChange.emit(value);
  }

}
