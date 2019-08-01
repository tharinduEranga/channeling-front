import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private panelTitle: '';
  constructor() { }
  setPanelTitle(title) {
    this.panelTitle = title;
  }
  getPanelTitle () {
    return this.panelTitle;
  }
}
