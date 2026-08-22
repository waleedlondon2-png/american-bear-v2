"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

const WIDTH = 360;
const HEIGHT = 270;

export default function ArcadeGame({ artwork = "/art/american-bear-arcade-v8.png" }: { artwork?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const input = useRef({ left: false, right: false, fire: false });
  const runningRef = useRef(false);
  const [gameKey, setGameKey] = useState(0);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("INSERT COIN");

  const start = useCallback(() => {
    runningRef.current = true;
    setRunning(true);
    setMessage("");
    setGameKey((key) => key + 1);
  }, []);

  const stopInput = () => {
    input.current.left = false;
    input.current.right = false;
    input.current.fire = false;
  };

  const pressScreen = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!runningRef.current) { start(); return; }
    event.currentTarget.setPointerCapture(event.pointerId);
    const bounds = event.currentTarget.getBoundingClientRect();
    const point = (event.clientX - bounds.left) / bounds.width;
    stopInput();
    if (point < .34) input.current.left = true;
    else if (point > .66) input.current.right = true;
    else input.current.fire = true;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let animation = 0;
    let previous = 0;
    let ship = WIDTH / 2;
    let aliens = Array.from({ length: 24 }, (_, index) => ({
      x: 60 + (index % 8) * 34,
      y: 58 + Math.floor(index / 8) * 25,
      alive: true,
    }));
    let bullets: { x: number; y: number }[] = [];
    let alienShots: { x: number; y: number }[] = [];
    let direction = 1;
    let alienTick = 0;
    let fireCooldown = 0;
    let score = 0;

    const drawAlien = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x - 10, y - 4, 20, 8);
      ctx.fillRect(x - 6, y - 8, 12, 16);
      ctx.fillStyle = "#020711";
      ctx.fillRect(x - 5, y - 3, 3, 3);
      ctx.fillRect(x + 2, y - 3, 3, 3);
    };

    const end = (nextMessage: string) => {
      runningRef.current = false;
      stopInput();
      setRunning(false);
      setMessage(nextMessage);
    };

    const render = (now: number) => {
      const elapsed = Math.min(34, now - previous || 16);
      previous = now;
      ctx.fillStyle = "#020711";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      for (let i = 0; i < 34; i += 1) {
        ctx.fillStyle = "#fff";
        ctx.fillRect((i * 47) % WIDTH, (i * 83) % HEIGHT, 1, 1);
      }
      ctx.fillStyle = "#ffd91a";
      ctx.font = "700 12px monospace";
      ctx.textAlign = "center";
      ctx.fillText("SPACE INVADERS", WIDTH / 2, 30);
      ctx.textAlign = "left";
      ctx.fillStyle = "#f4dfaa";
      ctx.font = "700 10px monospace";
      ctx.fillText(`SCORE ${String(score).padStart(5, "0")}`, 12, 18);

      if (runningRef.current) {
        if (input.current.left) ship = Math.max(18, ship - elapsed * .22);
        if (input.current.right) ship = Math.min(WIDTH - 18, ship + elapsed * .22);
        fireCooldown -= elapsed;
        if (input.current.fire && fireCooldown <= 0) {
          bullets.push({ x: ship, y: 220 });
          fireCooldown = 250;
        }

        alienTick += elapsed;
        if (alienTick > 430) {
          alienTick = 0;
          const living = aliens.filter((alien) => alien.alive);
          const nextHitsEdge = living.some((alien) => alien.x + direction * 8 > 338 || alien.x + direction * 8 < 22);
          if (nextHitsEdge) {
            direction *= -1;
            aliens.forEach((alien) => { alien.y += 9; });
          } else {
            aliens.forEach((alien) => { alien.x += direction * 8; });
          }
          if (living.length && Math.random() > .38) {
            const shooter = living[Math.floor(Math.random() * living.length)];
            alienShots.push({ x: shooter.x, y: shooter.y + 8 });
          }
        }

        bullets.forEach((bullet) => { bullet.y -= elapsed * .4; });
        alienShots.forEach((shot) => { shot.y += elapsed * .24; });
        bullets.forEach((bullet) => aliens.forEach((alien) => {
          if (alien.alive && Math.abs(alien.x - bullet.x) < 13 && Math.abs(alien.y - bullet.y) < 12) {
            alien.alive = false;
            bullet.y = -20;
            score += 100;
          }
        }));
        bullets = bullets.filter((bullet) => bullet.y > 38);
        alienShots = alienShots.filter((shot) => shot.y < HEIGHT + 10);

        if (alienShots.some((shot) => Math.abs(shot.x - ship) < 14 && shot.y > 224)) end("GAME OVER · INSERT COIN");
        else if (!aliens.some((alien) => alien.alive)) end("YOU WIN · INSERT COIN");
        else if (aliens.some((alien) => alien.alive && alien.y > 205)) end("GAME OVER · INSERT COIN");
      }

      aliens.forEach((alien, index) => {
        if (alien.alive) drawAlien(alien.x, alien.y, ["#76e7ff", "#ff98d8", "#aaff73"][Math.floor(index / 8)]);
      });
      ctx.fillStyle = "#ffd91a";
      ctx.beginPath();
      ctx.moveTo(ship, 220);
      ctx.lineTo(ship - 13, 240);
      ctx.lineTo(ship + 13, 240);
      ctx.closePath();
      ctx.fill();
      bullets.forEach((bullet) => { ctx.fillStyle = "#fff"; ctx.fillRect(bullet.x - 1, bullet.y, 2, 9); });
      alienShots.forEach((shot) => { ctx.fillStyle = "#ef3048"; ctx.fillRect(shot.x - 1, shot.y, 2, 8); });
      animation = requestAnimationFrame(render);
    };

    const onKey = (event: KeyboardEvent, pressed: boolean) => {
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "a", "d", " "].includes(key)) event.preventDefault();
      if (key === "arrowleft" || key === "a") input.current.left = pressed;
      if (key === "arrowright" || key === "d") input.current.right = pressed;
      if (key === " ") input.current.fire = pressed;
      if (pressed && event.key === "Enter" && !runningRef.current) start();
    };
    const keyDown = (event: KeyboardEvent) => onKey(event, true);
    const keyUp = (event: KeyboardEvent) => onKey(event, false);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    animation = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [gameKey, start]);

  return <section className="arcade-interlude" aria-label="Playable American Bear Space Invaders arcade">
    <img src={artwork} alt="A classic 1980s arcade cabinet with American Bear and a group of distinct adult women" />
    <div className="arcade-screen">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        aria-label="Space Invaders. Use arrow keys or A and D to move and space to fire. On touch screens, hold the left or right third to move and tap the center to fire."
        onPointerDown={pressScreen}
        onPointerUp={stopInput}
        onPointerCancel={stopInput}
        onPointerLeave={stopInput}
      />
      {!running && <button className="arcade-start arcade-intro" type="button" onClick={start} aria-label="Insert coin and start Space Invaders">
        <img src="/art/space-invaders-intro.webp" alt="" />
        <span>{message}</span>
      </button>}
    </div>
  </section>;
}
