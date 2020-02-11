import { Injectable } from '@angular/core';
import { WindowRef, ISnowplowWindow } from './window-ref';

@Injectable({
  providedIn: 'root'
})
export class SnowplowService {

  private _window: ISnowplowWindow;

  constructor(window: WindowRef) {
    this._window = window.nativeWindow;
    if (this._window.snowplow) {
      this._window.snowplow('newTracker', 'sp', 'collector', {
        appId: 'ngSnowplow',
        contexts: {
          webPage: true,
          performanceTiming: true
        }
      });
      this._window.snowplow('enableActivityTracking', 10, 10);
      this._window.snowplow('enableLinkClickTracking', null, true, true);
    }
  }

  public trackPageView(): void {
    if (this._window.snowplow) {
      this._window.snowplow('trackPageView');
    }
  }
}
