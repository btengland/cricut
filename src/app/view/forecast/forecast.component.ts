import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  // Used to identify the component in parent HTML templates.
  selector: 'app-forecast',
  // Allows component to be used without NgModule.
  standalone: true,
  // Provides @if and @for being able to use it in the HTML file.
  imports: [CommonModule],
  // HTML file import.
  templateUrl: './forecast.component.html',    
  // CSS file import.
  styleUrls: ['./forecast.component.css']
})

export class ForecastComponent {
  // Input allows parent to pass data to this component.
  @Input() forecast: { day: string; temperature: string; wind: string } | null = null;

  getDisplayDay(day: string): string {
    const dayNum = parseInt(day);
    if (dayNum === 1) {
      return 'Tomorrow';
    } else if (dayNum > 1) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + dayNum);
      const month = futureDate.getMonth() + 1; 
      const date = futureDate.getDate();
      return `${month}/${date}`;
    }
    return day;
  }
}
