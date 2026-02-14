import { Component, signal } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { RouterLink } from '@angular/router';
import { About } from './about/about';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ForecastComponent, RouterLink, About],
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

  onItemSelected(item: string) {
    console.log('Item selected from About component:', item);
    // You can add any logic here to handle the selected item
  }
}