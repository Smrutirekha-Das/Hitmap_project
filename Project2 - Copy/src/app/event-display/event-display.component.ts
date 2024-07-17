import { Component, Input,OnDestroy,OnInit } from '@angular/core';
import { HeatmapService } from '../services/heatmap.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { EventData } from '../models/event-data';
// import { HeatmapData } from '../models/heatmap-data.model';
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

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit, OnDestroy {
  @Input() events: EventData[] = [];
  heatmapData: HeatmapData[] = [];
  private eventSubscription!: Subscription;
  filterForm!: FormGroup;

 constructor(private heatmap : HeatmapService ,private formbuild: FormBuilder ) {
  this.filterForm = this.formbuild.group({
    startDate: [null],
    endDate: [null],
    minIntensity: [null],
    maxIntensity: [null]
  });
 }

 ngOnInit(): void {
  this.eventSubscription = this.heatmap.eventObservable.subscribe((events: EventData[]) => {
    this.heatmapData = this.heatmap.processEventData(events);
    this.applyFilters(events);
  });
  // Initial data processing
  this.applyFilters(this.events);
  this.heatmapData = this.heatmap.processEventData(this.events);
}
ngOnDestroy(): void {
  if (this.eventSubscription) {
    this.eventSubscription.unsubscribe();
  }
}
applyFilters(events: EventData[] = this.events): void {
  const { startDate, endDate, minIntensity, maxIntensity } = this.filterForm.value;
  const filteredEvents = events.filter(event => {
    const timestamp = event.Timestamp.getTime();
    const intensity = event.intensity;
    return (!startDate || new Date(startDate).getTime() <= timestamp) &&
           (!endDate || new Date(endDate).getTime() >= timestamp) &&
           (minIntensity === null || intensity >= minIntensity) &&
           (maxIntensity === null || intensity <= maxIntensity);
  });

  this.heatmapData = this.heatmap.processEventData(filteredEvents);
}
}
