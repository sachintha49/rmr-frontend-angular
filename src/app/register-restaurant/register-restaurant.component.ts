import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RestaurantService } from '../service/restaurant.service';
import { Restaurant } from '../model/restaurant';
import { HttpClientModule } from '@angular/common/http';
import { Cuisine } from '../model/cuisine';
import { Facility } from '../model/facility';

@Component({
  selector: 'app-register-restaurant',
  standalone: true,
  imports: [NgSelectModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    HttpClientModule
  ],
  templateUrl: './register-restaurant.component.html',
  styleUrl: './register-restaurant.component.css',
  providers: [RestaurantService]
})
export class RegisterRestaurantComponent {


  cuisinies: Cuisine[] = [];
  facilities: Facility[] = [];

  ngOnInit() {
    this.getCuisines();
    this.getFacilities();
  }

  restaurantForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    email: new FormControl(''),
    avgMealRate: new FormControl(''),
    cuisineList: new FormControl(''),
    openingHours: new FormControl(''),
    mobileNumber: new FormControl(''),
    priceRangeForTwoPax: new FormControl(''),
    facilitiesList: new FormControl(''),
    webSiteUrl: new FormControl('')
  })

  constructor(private restaurantService: RestaurantService) { }

  onSaveRestaurant() {
    const restaurant: Restaurant = new Restaurant();
    restaurant.name = this.restaurantForm.value.name;
    restaurant.description = this.restaurantForm.value.description;
    restaurant.address = this.restaurantForm.value.address;
    restaurant.city = this.restaurantForm.value.city;
    restaurant.cuisines = this.restaurantForm.value.cuisineList;
    restaurant.facilities = this.restaurantForm.value.facilitiesList;
    restaurant.priceRange = this.restaurantForm.value.priceRangeForTwoPax;
    restaurant.avgMealRate = parseFloat(this.restaurantForm.value.avgMealRate);
    restaurant.openingHours = this.restaurantForm.value.openingHours;
    restaurant.phone = this.restaurantForm.value.mobileNumber;
    restaurant.email = this.restaurantForm.value.email;
    restaurant.website = this.restaurantForm.value.webSiteUrl;

    this.restaurantService.addRestaurant(restaurant)
      .subscribe(data => {
        alert("Restaurant has been saved successfully!");
        console.log("response", data);
      })
  }

  getCuisines(): void {
    this.restaurantService.getCuisines()
        .subscribe( data => {
          this.cuisinies = data;
        });
  };

  getFacilities(): void {
    this.restaurantService.getFacilities()
        .subscribe( data => {
          this.facilities = data;
        });
  };

}
