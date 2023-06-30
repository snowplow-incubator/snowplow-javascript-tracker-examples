export function getPath(path) {
    const prefix = window.location.pathname.startsWith(
      "/snowplow-javascript-tracker-examples"
    )
      ? "/snowplow-javascript-tracker-examples/"
      : "/";
    return prefix + path;
}
