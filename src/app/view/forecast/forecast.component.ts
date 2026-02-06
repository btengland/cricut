import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
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
