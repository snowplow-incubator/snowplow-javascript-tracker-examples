import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SnowplowService } from './snowplow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngSnowplow';

  constructor(router: Router, snowplow: SnowplowService) {
    router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          snowplow.trackPageView();
        }
    });
  }
}
