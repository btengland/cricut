import { Component, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getWeather } from '../components/api-call';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ForecastComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  city = signal<string>('');
  weather = signal<any>(null);
  errorMessage = signal<string>('');
  loading = signal<boolean>(false);

  fetchWeather() {
    this.errorMessage.set('');
    this.loading.set(true);
    getWeather(this.city()).pipe(
      takeUntil(this.destroy$)
      // The subscribe method is used to handle the asynchronous response from the API call (try this, if error do this)
    ).subscribe({
      next: (response) => {
        this.weather.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        this.weather.set(null);
        this.errorMessage.set('Error fetching weather: ' + error.message);
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
