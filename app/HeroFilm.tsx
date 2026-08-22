"use client";

import { useEffect, useRef, useState } from "react";

const films = [
  { kind: "video", src: "/media/american-bear.mp4", label: "American Bear film" },
  { kind: "embed", src: "https://streamable.com/e/8plyph", label: "American Bear alternate film" },
];

export default function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bootTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const startTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const [powered, setPowered] = useState(false);
  const [booting, setBooting] = useState(false);
  const [filmIndex, setFilmIndex] = useState(0);
  const activeFilm = films[filmIndex];

  useEffect(() => () => {
    if (bootTimer.current) window.clearTimeout(bootTimer.current);
    if (startTimer.current) window.clearTimeout(startTimer.current);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !powered) return;
    video.load();
    video.currentTime = 0;
    video.muted = true;
  }, [filmIndex, powered]);

  const togglePower = () => {
    const video = videoRef.current;
    if (bootTimer.current) window.clearTimeout(bootTimer.current);
    if (startTimer.current) window.clearTimeout(startTimer.current);
    if (powered) {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
      setPowered(false);
      setBooting(false);
      return;
    }
    setFilmIndex(Math.floor(Math.random() * films.length));
    setPowered(true);
    setBooting(true);
    bootTimer.current = window.setTimeout(() => {
      setBooting(false);
    }, 720);
    startTimer.current = window.setTimeout(() => {
      if (!video) return;
      video.currentTime = 0;
      video.muted = false;
      void video.play();
    }, 1720);
  };

  return (
    <section className="film" aria-label="American Bear film">
      <div className="film-title">
        <p>AN AMERICAN ORIGINAL</p>
        <h2>BORN FREE.<br />RAISED LOUD.</h2>
      </div>
      <div className="film-media">
        <div className={`tv-set ${powered ? "is-on" : "is-off"}${booting ? " is-booting" : ""}`}>
          <div className="tv-screen">
            {activeFilm.kind === "video" ? (
              <video ref={videoRef} loop playsInline preload="metadata" poster="/art/bear-modern.jpg" aria-label={activeFilm.label}>
                <source src={activeFilm.src} type="video/mp4" />
              </video>
            ) : (
              <iframe src={`${activeFilm.src}?`} title={activeFilm.label} allow="fullscreen" allowFullScreen />
            )}
            <div className="film-shade" />
          </div>
          <button className="power-dial" type="button" onClick={togglePower} aria-pressed={powered} aria-label={powered ? "Turn television off" : "Turn television on"}>
            <i aria-hidden="true" />
            <span>{powered ? "OFF" : "ON"}</span>
          </button>
          <b className="power-led" aria-hidden="true" />
          <div className="tv-console" aria-hidden="true"><span>COLORVISION 1988</span><i/><i/><b>VHF · UHF</b></div>
        </div>
      </div>
    </section>
  );
}
