import { HomePageComponent } from './view/home-page.component';
import { About } from './view/about/about';
import { WeatherComponent } from './view/weather/weather.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: About },
  { path: 'weather', component: WeatherComponent },
];
