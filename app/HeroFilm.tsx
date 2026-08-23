"use client";

import { useEffect, useRef, useState } from "react";

const films = [
  { kind: "video", src: "/media/american-bear.mp4", label: "American Bear film" },
  { kind: "video", src: "/media/2026-08-22 22.04.52-2-2 (1).mp4", label: "American Bear alternate film" },
];

export default function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bootTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const startTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const [powered, setPowered] = useState(false);
  const [booting, setBooting] = useState(false);
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const activeFilm = filmIndex === null ? null : films[filmIndex];

  useEffect(() => () => {
    if (bootTimer.current) window.clearTimeout(bootTimer.current);
    if (startTimer.current) window.clearTimeout(startTimer.current);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !powered || activeFilm?.kind !== "video") return;
    video.load();
    video.currentTime = 0;
    video.muted = true;
    void video.play().then(() => {
      video.muted = false;
    });
  }, [filmIndex, powered, activeFilm?.kind]);

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
      setFilmIndex(null);
      return;
    }
    const nextFilmIndex = Math.floor(Math.random() * films.length);
    setPowered(true);
    setBooting(true);
    bootTimer.current = window.setTimeout(() => {
      setBooting(false);
    }, 720);
    startTimer.current = window.setTimeout(() => {
      // Mount exactly one selected film only after the CRT fuzz and one-second pause.
      // Turning the TV off unmounts it, so no clip can continue or queue behind another.
      setFilmIndex(nextFilmIndex);
    }, 1720);
  };

  const seek = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
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
            {activeFilm?.kind === "video" ? (
              <video className={filmIndex === 1 ? "film-wide" : undefined} ref={videoRef} loop playsInline preload="metadata" aria-label={activeFilm.label}>
                <source src={activeFilm.src} type="video/mp4" />
              </video>
            ) : null}
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
      <div className="vcr-cabinet" aria-label="American Bear VCR controls">
        <img className="original-vcr-cabinet" src="/art/american-bear-vcr-cabinet.png" alt="Dark walnut cabinet with a vintage VCR" />
        <div className="vcr-shelf">
          <div className="vcr-display">00:00 <span>VHS</span></div>
          <div className="vcr-deck"><i /><b>AMERICAN BEAR VIDEO</b><i /></div>
        </div>
        <div className="vcr-brand">COLORVISION · TIME COMMANDER <span>HI-FI STEREO</span></div>
        <div className="vcr-controls">
          <button type="button" onClick={() => seek(-10)} aria-label="Rewind 10 seconds">◀◀</button>
          <button className="vcr-play" type="button" onClick={togglePower} aria-label={powered ? "Stop video" : "Play video"}>{powered ? "■" : "▶"}</button>
          <button type="button" onClick={() => seek(10)} aria-label="Fast forward 10 seconds">▶▶</button>
        </div>
      </div>
    </section>
  );
}
