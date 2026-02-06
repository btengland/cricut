import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getWeather } from '../components/api-call';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ForecastComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  city = signal<string>('');
  weather = signal<any>(null);
  errorMessage = signal<string>('');
  loading = signal<boolean>(false);

  async fetchWeather() {
    this.errorMessage.set('');
    try {
      this.loading.set(true);
      const response = await getWeather(this.city());
      this.weather.set(response);
      this.errorMessage.set('');
    } catch (error) {
      this.weather.set(null);
      this.errorMessage.set('Error fetching weather: ' + (error));
      console.error('Error fetching weather:', error);
    } finally {
      this.loading.set(false);
    }
  }
  
}
