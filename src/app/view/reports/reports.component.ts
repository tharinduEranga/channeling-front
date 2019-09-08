import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Basic Column Chart in Angular'
      },
      data: [{
        type: 'column',
        dataPoints: [
          {y: 71, label: 'Apple'},
          {y: 55, label: 'Mango'},
          {y: 50, label: 'Orange'},
          {y: 65, label: 'Banana'},
          {y: 95, label: 'Pineapple'},
          {y: 68, label: 'Pears'},
          {y: 28, label: 'Grapes'},
          {y: 34, label: 'Lychee'},
          {y: 14, label: 'Jackfruit'}
        ]
      }]
    });

    chart.render();


    const dataPoints = [];
    let y = 0;
    for ( let i = 0; i < 10000; i++ ) {
      y += Math.round(5 + Math.random() * (-5 - 5));
      dataPoints.push({ y: y});
    }
    const chart2 = new CanvasJS.Chart('chartContainer2', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Performance Demo - 10000 DataPoints'
      },
      subtitles: [{
        text: 'Try Zooming and Panning'
      }],
      data: [
        {
          type: 'line',
          dataPoints: dataPoints
        }]
    });

    chart2.render();

  }
}

