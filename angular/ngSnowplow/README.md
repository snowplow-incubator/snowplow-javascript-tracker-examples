# ngSnowplow

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Requirements

Assuming [NodeJS and NPM](https://nodejs.org/en/) are installed.

Install Angular CLI globally:

```
npm install -g @angular/cli
```

## Add your collector URL

Navigate to `src/app/snowplow.service.ts` and add your collector url to the call to `newTracker`.

## Notable files

- src/index.html
- src/assets/sp.js
- src/app/window-ref.ts
- src/app/snowplow.service.ts
- src/app/app.component.ts

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
