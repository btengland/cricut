import { Component, signal } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ForecastComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
counter = signal<number>(0);
  childTitle = signal<string>("");

  increment = (num: number) => {
    this.counter.update(prev => prev + num);
  }

  onTitleChange(title: string) {
    this.childTitle.set(title);
  }
}