# Flutter web example

A slide (15) puzzle implemented in Dart and Flutter, based on [flutter.github.io/samples][samples].

## Setup

Requires [flutter][install] to be installed and available on PATH (as per the flutter installation instructions).

### Building sample

Update Flutter and enable web support

```console
flutter channel dev
flutter upgrade
flutter config --enable-web
```

Edit Line 10 of [web/index.html](web/index.html) to point to your own Snowplow Collector.

Run the demo using the `chrome` device type:

```console
cd slide_puzzle
flutter packages get
flutter run -d chrome
```

You should see a message printing the URL to access: `http://localhost:8080`

Flutter Web support is available as a technical preview and is only available in the `dev` or `master` channels.

### Example Snowplow JS Tracker usage

The Snowplow JavaScript Tracker can be loaded in the index.html and then accessed via a Dart external.
You must include [sp.js](https://github.com/snowplow/snowplow-javascript-tracker/releases/) as an asset in your web build.

See: [web/index.html](web/index.html)
You will want to point Line 10 to your own Snowplow Collector.

Two examples of tracking are in this repository:
A Page View on initial load: [lib/src/puzzle_home_state.dart](lib/src/puzzle_home_state.dart)
Tracking events as users click on tiles: [lib/src/core/puzzle_animator.dart](lib/src/core/puzzle_animator.dart)

### Code Snippets

Accessing the Snowplow JavaScript Tracker is done with the following lines:

```dart
@JS()
library snowplow;

import 'package:js/js.dart';

@JS('window.snowplow')
external void snowplow(String method);
```

and can then be used:

```dart
snowplow('trackPageView');
```

[install]: https://flutter.dev/docs/get-started/install
[samples]: https://flutter.github.io/samples/
