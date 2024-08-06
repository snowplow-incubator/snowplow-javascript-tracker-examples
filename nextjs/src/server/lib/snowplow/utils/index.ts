import { config } from "@/config";

export function getSnowplowCookieValue(
  cookieObject: Partial<{
    [key: string]: string;
  }>
) {
  const snowplowIdCookieKey = Object.keys(cookieObject).find((key) =>
    key.match(config.tracking.SNOWPLOW_ID_COOKIE_PREFIX)
  );
  return snowplowIdCookieKey
    ? (cookieObject[snowplowIdCookieKey] as string)
    : null;
}
