import { Component, OnInit } from '@angular/core';
import {PanelService} from '../../services/panel.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  constructor(private panelService: PanelService) {
    panelService.setPanelTitle('Doctors');
  }

  ngOnInit() {
  }

}
