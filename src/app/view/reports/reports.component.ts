import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {ReportsService} from '../../services/reports.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  private monthWiseAppointments: MonthWiseApintmnts[] = [];

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.initReportChartUis();
    this.getMonthWiseAppointments();
  }

  private initReportChartUis() {

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

  private getMonthWiseAppointments() {
    const today = new Date();
    const year = String(today.getFullYear());
    this.reportsService.getAppointmentsMonthWiseByYear(year).subscribe(value => {
      if (value.success) {
        const appointmentData = [];
        value.body.forEach(value1 => {
          appointmentData.push({y: value1.count, label: value1.month});
        });
        const chart = new CanvasJS.Chart('chartContainer', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Month-wise appointment totals of this year'
          },
          data: [{
            type: 'column',
            dataPoints: appointmentData
          }]
        });

        chart.render();
      } else {
        Swal.fire('Error occured!', value.message, 'error');
      }
    });
  }
}

