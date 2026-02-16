import { HomePageComponent } from './view/home-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // keep eager

  {
    path: 'about',
    loadComponent: () =>
      import('./view/about/about')
        .then(m => m.About) // only loads when route is visited
  },

  {
    path: 'weather',
    loadComponent: () =>
      import('./view/weather/weather.component')
        .then(m => m.WeatherComponent) // only loads when needed
  }
];

