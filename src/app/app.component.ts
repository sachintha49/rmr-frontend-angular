import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, RouterOutlet, NgxMaterialTimepickerModule, ReactiveFormsModule,
             HttpClientModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meal-recommendation-frontend';

  constructor() {}

}
