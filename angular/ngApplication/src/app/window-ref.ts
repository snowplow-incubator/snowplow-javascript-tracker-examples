import { Injectable } from '@angular/core';

export interface ISnowplowWindow extends Window {
    snowplow: (...args) => void;
}

function getWindow(): any {
    return window;
}

@Injectable()
export class WindowRef {
    get nativeWindow(): ISnowplowWindow {
        return getWindow();
    }
}