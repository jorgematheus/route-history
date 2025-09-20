import { Component } from '@angular/core';
import { RouteHistoryService } from './route-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'route-history';

  constructor(public routeHistory: RouteHistoryService) {}

  onBack() {
    this.routeHistory.back();
  }
}
