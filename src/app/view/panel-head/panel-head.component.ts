import { Component, OnInit } from '@angular/core';
import {PanelService} from '../../services/panel.service';

@Component({
  selector: 'app-panel-head',
  templateUrl: './panel-head.component.html',
  styleUrls: ['./panel-head.component.scss']
})
export class PanelHeadComponent implements OnInit {
  private title = '';
  constructor(private panelService: PanelService) { }

  ngOnInit() {
    this.title = this.panelService.getPanelTitle();
  }

}
