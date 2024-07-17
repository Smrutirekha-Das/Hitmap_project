import { Component } from '@angular/core';
import { HeatmapService } from './services/heatmap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project2';


  eventData = [
    { Timestamp: new Date(), intensity: 5 },
    { Timestamp: new Date('2024-07-15T14:30:00'), intensity: 8 },
    { Timestamp: new Date('2024-07-15T16:00:00'), intensity: 3 }
  ];

  constructor(private heatmap: HeatmapService) {
    // Simulate real-time data updates
    setTimeout(() => {
      this.eventData.push({ Timestamp: new Date(), intensity: 7 });
      this.heatmap.updateEvents(this.eventData);
    }, 5000);

    setTimeout(() => {
      this.eventData.push({ Timestamp: new Date('2024-07-15T17:00:00'), intensity: 6 });
      this.heatmap.updateEvents(this.eventData);
    }, 10000);
  }
}
