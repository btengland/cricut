// Angular imports
import { Component, signal, OnDestroy } from '@angular/core';
// Form handling
import { FormsModule } from '@angular/forms';
// Weather API function
import { getWeather } from '../components/api-call';
// Common Angular features
import { CommonModule } from '@angular/common';
// Forecast display component
import { ForecastComponent } from './forecast/forecast.component';
// RxJS for cleanup
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  // Identifies the component in parent HTML templates.
  selector: 'app-home-page',
  // Allows component to be used without NgModule.
  standalone: true,
  // Provides form, common, and forecast features for template.
  imports: [FormsModule, CommonModule, ForecastComponent],
  // HTML file import.
  templateUrl: './home-page.component.html',
  // CSS file import.
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnDestroy {
  // Used to clean up subscriptions.
  private destroy$ = new Subject<void>();
  // City input signal.
  city = signal<string>('');
  // Weather data signal.
  weather = signal<any>(null);
  // Error message signal.
  errorMessage = signal<string>('');
  // Loading state signal.
  loading = signal<boolean>(false);

  // Fetches weather for the city.
  fetchWeather() {
    this.errorMessage.set('');
    this.loading.set(true);
    getWeather(this.city()).pipe(
      takeUntil(this.destroy$)
      // Handles async API response.
    ).subscribe({
      next: (response) => {
        this.weather.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        this.weather.set(null);
        this.errorMessage.set(error.message);
        this.loading.set(false);
      }
    });
  }

  // Cleans up subscriptions.
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
