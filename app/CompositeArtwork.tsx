"use client";

import { useEffect, useState } from "react";

type CompositeArtworkProps = {
  images: readonly string[];
  alt: string;
};

export default function CompositeArtwork({ images, alt }: CompositeArtworkProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });

    Promise.all(images.map(load)).then((panels) => {
      if (cancelled) return;

      const width = 1600;
      const divider = 10;
      const heights = panels.map((panel) => Math.round((panel.naturalHeight / panel.naturalWidth) * width));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = heights.reduce((total, height) => total + height, 0) + divider * (panels.length - 1);

      const context = canvas.getContext("2d");
      if (!context) return;

      context.fillStyle = "#101217";
      context.fillRect(0, 0, canvas.width, canvas.height);

      let y = 0;
      panels.forEach((panel, index) => {
        context.drawImage(panel, 0, y, width, heights[index]);
        y += heights[index] + divider;
      });

      setSrc(canvas.toDataURL("image/jpeg", 0.95));
    }).catch(() => {
      // The first panel remains visible as a safe fallback if an asset cannot load.
    });

    return () => { cancelled = true; };
  }, [images]);

  return <img className="unified-america-art" src={src ?? images[0]} alt={alt} />;
}
