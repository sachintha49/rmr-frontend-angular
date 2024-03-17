import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    // Check if localStorage value is null
    if (typeof sessionStorage !== 'undefined') {
      if (!localStorage.getItem('user') || !localStorage.getItem('admin') || !localStorage.getItem('system')) {
        // Navigate to the login page
        this.router.navigate(['/login']);
      }
    }
  }

}
