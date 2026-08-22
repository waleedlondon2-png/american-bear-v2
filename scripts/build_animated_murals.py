from pathlib import Path
from math import sin, pi
import random
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "public" / "art"


def feather_mask(size, boxes, blur=18):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    for box in boxes:
        draw.ellipse(box, fill=255)
    return mask.filter(ImageFilter.GaussianBlur(blur))


def save_loop(frames, name, duration, quality=78):
    frames[0].save(
        ART / name,
        save_all=True,
        append_images=frames[1:],
        duration=duration,
        loop=0,
        format="WEBP",
        quality=quality,
        method=6,
        minimize_size=True,
    )


def writing_loop():
    base = Image.open(ART / "bear-history-v3.png").convert("RGB")
    changed = Image.open(ART / "bear-history-frame-2.png").convert("RGB")
    mask = feather_mask(base.size, [(110, 445, 565, 690)], 24)
    frames = []
    for n in range(240):
        amount = (sin(2 * pi * n / 240 - pi / 2) + 1) / 2
        mixed = Image.blend(base, changed, amount)
        frames.append(Image.composite(mixed, base, mask))
    save_loop(frames, "bear-history-writing-240.webp", 8)


def action_loop():
    base = Image.open(ART / "america-action-v2.jpg").convert("RGB")
    changed = Image.open(ART / "america-action-frame-2.png").convert("RGB")
    gun_mask = feather_mask(base.size, [(1160, 400, 1465, 690)], 28)
    frames = []
    for n in range(60):
        pulse = max(0, sin(2 * pi * n / 60))
        mixed = Image.blend(base, changed, min(1, pulse * 1.25))
        frame = Image.composite(mixed, base, gun_mask).convert("RGBA")
        if pulse > .12:
            smoke = Image.new("RGBA", base.size, (0, 0, 0, 0))
            d = ImageDraw.Draw(smoke)
            rise = int(34 * pulse)
            alpha = int(135 * (1 - pulse * .55))
            d.ellipse((1390, 455 - rise, 1455, 520 - rise), fill=(225, 222, 210, alpha))
            d.ellipse((1424, 428 - rise, 1495, 496 - rise), fill=(170, 171, 165, alpha // 2))
            smoke = smoke.filter(ImageFilter.GaussianBlur(13))
            frame = Image.alpha_composite(frame, smoke)
        frames.append(frame.convert("RGB"))
    save_loop(frames, "america-action-gun-60.webp", 33)


def music_loop():
    base = Image.open(ART / "america-music-v7.png").convert("RGBA")
    rng = random.Random(1984)
    sparkle_points = [(rng.randint(805, 965), rng.randint(145, 460)) for _ in range(22)]
    frames = []
    for n in range(60):
        frame = base.copy()
        lights = Image.new("RGBA", base.size, (0, 0, 0, 0))
        d = ImageDraw.Draw(lights)
        phase = 2 * pi * n / 60
        for i, x in enumerate((820, 920, 1025, 1130, 1240)):
            glow = int(95 + 80 * sin(phase + i * .9))
            d.ellipse((x - 44, 38, x + 44, 126), fill=(255, 205 if i % 2 == 0 else 105, 145 if i % 2 else 80, max(20, glow)))
        for i, (x, y) in enumerate(sparkle_points):
            if (n + i * 7) % 28 < 4:
                d.ellipse((x - 2, y - 2, x + 2, y + 2), fill=(255, 250, 220, 220))
        lights = lights.filter(ImageFilter.GaussianBlur(10))
        frames.append(Image.alpha_composite(frame, lights).convert("RGB"))
    save_loop(frames, "america-music-lights-60.webp", 33)


def police_loop():
    base = Image.open(ART / "bear-police-nwa-v8.png").convert("RGBA")
    frames = []
    for n in range(40):
        frame = base.copy()
        lights = Image.new("RGBA", base.size, (0, 0, 0, 0))
        d = ImageDraw.Draw(lights)
        side = n < 20
        red = (255, 30, 45, 190 if side else 45)
        blue = (35, 145, 255, 45 if side else 190)
        d.ellipse((1300, 180, 1465, 275), fill=red)
        d.ellipse((1110, 180, 1275, 275), fill=blue)
        lights = lights.filter(ImageFilter.GaussianBlur(18))
        frames.append(Image.alpha_composite(frame, lights).convert("RGB"))
    save_loop(frames, "bear-police-lights-40.webp", 40)


def kitt_loop():
    base = Image.open(ART / "america-tv-icons-v2.png").convert("RGBA")
    frames = []
    for n in range(60):
        t = n / 59
        pingpong = 1 - abs(2 * t - 1)
        x = int(43 + pingpong * 183)
        frame = base.copy()
        light = Image.new("RGBA", base.size, (0, 0, 0, 0))
        scanner = Image.new("RGBA", base.size, (0, 0, 0, 0))
        d = ImageDraw.Draw(scanner)
        # Deepen and widen KITT's original grille-light recess, keeping every
        # animated pixel inside the physical scanner bar.
        d.rounded_rectangle((28, 342, 241, 363), radius=7, fill=(10, 0, 2, 205))
        d.rounded_rectangle((34, 346, 235, 359), radius=4, fill=(62, 1, 5, 220))
        d.rounded_rectangle((max(34, x - 16), 347, min(235, x + 16), 358), radius=3, fill=(255, 28, 30, 235))
        scanner = scanner.filter(ImageFilter.GaussianBlur(0.55))
        clip = Image.new("L", base.size, 0)
        ImageDraw.Draw(clip).rounded_rectangle((28, 342, 241, 363), radius=7, fill=255)
        light.paste(scanner, (0, 0), clip)
        frames.append(Image.alpha_composite(frame, light).convert("RGB"))
    save_loop(frames, "america-tv-kitt-60.webp", 28)


if __name__ == "__main__":
    writing_loop()
    kitt_loop()
