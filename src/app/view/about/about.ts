import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="about-title">
      about works!
    </p>
    <ul class="item-list">
      @for (item of items; track item) {
        <li class="item" (click)="onItemClick(item)">{{ item }}</li>
      }
    </ul>
  `,
  styles: `
    .about-title {
      color: #007bff;
      font-size: 1.2em;
      text-align: center;
      margin-bottom: 20px;
    }
    .item-list {
      list-style-type: none;
      padding: 0;
    }
    .item {
      background-color: #f8f9fa;
      margin: 5px 0;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #dee2e6;
      cursor: pointer;
    }
    .item:hover {
      background-color: #e9ecef;
    }
  `,
})
export class About {
  items = ['Item 1', 'Item 2', 'Item 3'];

  @Output() itemSelected = new EventEmitter<string>();

  onItemClick(item: string) {
    this.itemSelected.emit(item);
  }
}
