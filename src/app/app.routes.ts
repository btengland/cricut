import { HomePageComponent } from './view/home-page.component';
import { About } from './view/about/about';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: About },
];
