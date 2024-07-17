import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import { EventData} from 'src/app/models/event-data'
// import { HeatmapData } from 'src/app/models/heatmap-data.model'
interface EventData {
  Timestamp: Date;
  intensity: number;
}
interface HeatmapData {
  date: string;
  timeSlot: string;
  frequency: number;
  colorIntensity: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  private eventSubject = new Subject<EventData[]>();
  eventObservable: Observable<EventData[]> = this.eventSubject.asObservable().pipe(
    debounceTime(500) // Adjust debounce time as needed
  );

  constructor() { }

  processEventData(events: EventData[]): HeatmapData[] {
    const heatmapData: HeatmapData[] = events.map(event => {
      const date = event.Timestamp.toISOString().split('T')[0];
      const hours = event.Timestamp.getHours();
      const timeSlot = `${hours.toString().padStart(2, '0')}:00 - ${(hours + 1).toString().padStart(2, '0')}:59`;
      const frequency = this.calculateFrequency(events, date, timeSlot);
      const colorIntensity = this.getColorIntensity(frequency);
      return { date, timeSlot, frequency, colorIntensity };
    });

    return heatmapData;
  }
  private calculateFrequency(events: EventData[], date: string, timeSlot: string): number {
    // Implement logic to calculate frequency for given date and timeSlot
    return events.filter(event => {
      const eventDate = event.Timestamp.toISOString().split('T')[0];
      const eventTimeSlot = `${event.Timestamp.getHours().toString().padStart(2, '0')}:00 - ${(event.Timestamp.getHours() + 1).toString().padStart(2, '0')}:59`;
      return eventDate === date && eventTimeSlot === timeSlot;
    }).length;
  }
  private getColorIntensity(frequency: number): string {
    const maxFrequency = 10; // Example max frequency
    const intensity = Math.min(frequency / maxFrequency, 1);
    const red = Math.floor(255 * intensity);
    const green = Math.floor(255 * (1 - intensity));
    return `rgb(${red},${green},0)`;
  }
  // Method for data update
  updateEvents(newEvents: EventData[]): void {

    // const worker = new Worker(new URL('./data-processing.worker', import.meta.url));
    // worker.postMessage(newEvents);
    // worker.onmessage = ({ data }) => {
    //   this.eventSubject.next(newEvents);
    // }
  };
}
