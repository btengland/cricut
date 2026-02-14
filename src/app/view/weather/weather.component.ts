import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getWeather } from '../../components/api-call';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city = signal<string>('');
  weatherData = signal<any>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');

  async getWeatherData() {
    if (!this.city().trim()) {
      this.error.set('Please enter a city name');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.weatherData.set(null);

    try {
      getWeather(this.city()).subscribe({
        next: (data) => {
          this.weatherData.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      });
    } catch (err: any) {
      this.error.set('Failed to fetch weather data: ' + err.message);
      this.loading.set(false);
    }
  }
}