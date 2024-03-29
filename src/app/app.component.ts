import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    NgxMaterialTimepickerModule,
    CommonModule,
    RouterOutlet,
    FooterComponent,
    NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meal-recommendation-frontend';

  constructor() {}

}
