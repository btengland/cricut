import { Component, signal, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})

export class ForecastComponent implements OnInit {
 @Input() data!: { increment: (num: number) => void };
 @Output() titleChange = new EventEmitter<string>();
  title = signal<string>("");
  input = signal<number>(0);

  ngOnInit(): void {
      this.title.set("Weather Forecast");
      this.titleChange.emit(this.title());
  }

  onInputChange(value: string) {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      this.data.increment(numValue)
    }
  }
}