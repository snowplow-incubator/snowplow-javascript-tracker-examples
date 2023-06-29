import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Snowplow from "./routes/snowplow";
import Form from "./routes/form";
import IframeForm from "./routes/iframeForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Youtube from "./routes/youtube";
import YoutubePlayer from "./routes/youtubePlayer.jsx";
import { getPath } from "./helpers";
import Media from "./routes/media.jsx";
import VimeoIframe from "./routes/vimeoIframe";
import VimeoPlayer from "./routes/vimeoPlayer";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={getPath("")} element={<App />} />
        <Route path={getPath("snowplow")} element={<Snowplow />} />
        <Route path={getPath("form")} element={<Form />} />
        <Route path={getPath("iframe_form")} element={<IframeForm />} />
        <Route path={getPath("youtube")} element={<Youtube />} />
        <Route path={getPath("youtube_player")} element={<YoutubePlayer />} />
        <Route path={getPath("media")} element={<Media />} />
        <Route path={getPath("vimeo_iframe")} element={<VimeoIframe />} />
        <Route path={getPath("vimeo_player")} element={<VimeoPlayer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
