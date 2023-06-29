import { useState, useEffect } from "react";
import "./table.css";
import { mediaSchemas } from "../constants";

let allEvents = [];

const createEventHandler = (schemas) => {
  return (e) => {
    const { id, event, context } = e.detail;

    if (schemas.some((s) => event.data.schema.includes(s))) {
      allEvents.push({
        id: id,
        event: event.data,
        context: context.data,
      });
    }
  };
};

function MediaEvents({ schemas = mediaSchemas }) {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    window.addEventListener("spEvent", createEventHandler(schemas));
  }, []);

  useEffect(() => {
    let interval = setInterval(() => setEventList([...allEvents]), 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  });

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Event</th>
          <th colSpan={12}>Player entity</th>
          <th colSpan={12}>Session entity</th>
          <th colSpan={3}>Ad break entity</th>
          <th colSpan={7}>Ad entity</th>
        </tr>
        <tr>
          <th>Schema</th>
          <th>Data</th>

          <th>Label</th>
          <th>Media type</th>
          <th>Player type</th>
          <th>Current time</th>
          <th>Duration</th>
          <th>Ended</th>
          <th>Loop</th>
          <th>Muted</th>
          <th>Paused</th>
          <th>Playback rate</th>
          <th>Volume</th>

          <th>Session ID</th>
          <th>Content watched (s)</th>
          <th>Time played (s)</th>
          <th>Time played muted (s)</th>
          <th>Time paused (s)</th>
          <th>Time spent ads (s)</th>
          <th>Time buffering (s)</th>
          <th>Average playback rate</th>
          <th>Ads</th>
          <th>Ads skipped</th>
          <th>Ads clicked</th>
          <th>Ad breaks</th>

          <th>Name</th>
          <th>ID</th>
          <th>Type</th>

          <th>Name</th>
          <th>ID</th>
          <th>Creative ID</th>
          <th>Pod position</th>
          <th>Duration</th>
          <th>Skippable</th>
        </tr>
      </thead>
      <tbody>
        {eventList
          .slice(0)
          .reverse()
          .map((e) => (
            <EventRow key={e.id} event={e.event} context={e.context} />
          ))}
      </tbody>
    </table>
  );
}

function EventRow({ event, context }) {
  let mediaPlayer = context.find((e) => e.schema.includes("/media_player/"));
  let session = context.find((e) => e.schema.includes("/session/"));
  let adBreak = context.find((e) => e.schema.includes("/ad_break/"));
  let ad = context.find((e) => e.schema.includes("/ad/"));

  return (
    <tr>
      <th>{event.schema.split("/")[1]}</th>
      <td>
        {Object.keys(event.data).map((key) => (
          <>
            {key}: {JSON.stringify(event.data[key])}
            <br />
          </>
        ))}
      </td>

      <td>{mediaPlayer.data.label}</td>
      <td>{mediaPlayer.data.mediaType}</td>
      <td>{mediaPlayer.data.playerType}</td>
      <td>{mediaPlayer.data.currentTime}</td>
      <td>{mediaPlayer.data.duration}</td>
      <td>{mediaPlayer.data.ended ? "T" : "F"}</td>
      <td>{mediaPlayer.data.loop ? "T" : "F"}</td>
      <td>{mediaPlayer.data.muted ? "T" : "F"}</td>
      <td>{mediaPlayer.data.paused ? "T" : "F"}</td>
      <td>{mediaPlayer.data.playbackRate}</td>
      <td>{mediaPlayer.data.volume}</td>

      <td>{session.data.mediaSessionId}</td>
      <td>{session.data.contentWatched}</td>
      <td>{session.data.timePlayed}</td>
      <td>{session.data.timePlayedMuted}</td>
      <td>{session.data.timePaused}</td>
      <td>{session.data.timeSpentAds}</td>
      <td>{session.data.timeBuffering}</td>
      <td>{session.data.avgPlaybackRate}</td>
      <td>{session.data.ads}</td>
      <td>{session.data.adsSkipped}</td>
      <td>{session.data.adsClicked}</td>
      <td>{session.data.adBreaks}</td>

      <td>{adBreak?.data.name}</td>
      <td>{adBreak?.data.breakId}</td>
      <td>{adBreak?.data.breakType}</td>

      <td>{ad?.data.name}</td>
      <td>{ad?.data.adId}</td>
      <td>{ad?.data.creativeId}</td>
      <td>{ad?.data.podPosition}</td>
      <td>{ad?.data.duration}</td>
      <td>{ad === undefined ? null : ad.data.skippable ? "T" : "F"}</td>
    </tr>
  );
}

export default MediaEvents;
