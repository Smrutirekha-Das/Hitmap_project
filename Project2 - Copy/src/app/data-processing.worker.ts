// import { EventData } from "./models/event-data";
// import {HeatmapData} from './models/heatmap-data.model'

addEventListener('message', ({ data }) => {
    const response = processEventData({ events: data });
    postMessage(response);
  });
  

function processEventData(arg0: { events: any; }) {
}
//   function processEventData({ events }: { events: EventData[]; }): HeatmapData[] {
//     // Same data processing logic as in the service
//   }
  