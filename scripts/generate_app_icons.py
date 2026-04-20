"""One-off: crop screenshot to icon, write Android mipmaps + drawable foregrounds + iOS AppIcon."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts" / "app-icon-source.png"
FALLBACK_SRC = Path(
    r"C:\Users\zubair\.cursor\projects\e-New-folder-Aplex-mobile-app\assets"
    r"\c__Users_zubair_AppData_Roaming_Cursor_User_workspaceStorage_07db214f103cb1c4602e37ced2fc06cc_images_Screenshot_20260417-160109_2-c2554e70-90fe-48a5-b6af-29d6b9333dff.png"
)


def square_center(im: Image.Image) -> Image.Image:
    w, h = im.size
    s = min(w, h)
    left = (w - s) // 2
    top = (h - s) // 2
    return im.crop((left, top, left + s, top + s))


def trim_off_background(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    corner = im.getpixel((0, 0))
    bg = Image.new("RGB", im.size, corner)
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        im = im.crop(bbox)
    return square_center(im)


def save_png(im: Image.Image, path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.resize((size, size), Image.Resampling.LANCZOS).save(path, format="PNG")


def main() -> None:
    src = SRC if SRC.exists() else FALLBACK_SRC
    if not src.exists():
        raise SystemExit(f"Source image not found. Put a PNG at {SRC} or {FALLBACK_SRC}")

    base = trim_off_background(Image.open(src))
    # In-app master (reasonable resolution)
    assets_dir = ROOT / "src" / "assets" / "images"
    assets_dir.mkdir(parents=True, exist_ok=True)
    save_png(base, assets_dir / "app-icon.png", 512)

    # Android launcher mipmaps (legacy + round use same bitmaps)
    mipmap_sizes = {
        "mipmap-ldpi": 36,
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192,
    }
    res = ROOT / "android" / "app" / "src" / "main" / "res"
    for folder, px in mipmap_sizes.items():
        save_png(base, res / folder / "ic_launcher.png", px)
        save_png(base, res / folder / "ic_launcher_round.png", px)

    # Adaptive icon foreground bitmaps (108dp canvas per density)
    fg_sizes = {
        "drawable-mdpi": 108,
        "drawable-hdpi": 162,
        "drawable-xhdpi": 216,
        "drawable-xxhdpi": 324,
        "drawable-xxxhdpi": 432,
    }
    for folder, px in fg_sizes.items():
        save_png(base, res / folder / "ic_launcher_logo.png", px)

    # iOS AppIcon.appiconset
    ios_set = ROOT / "ios" / "oenodPay" / "Images.xcassets" / "AppIcon.appiconset"
    ios_set.mkdir(parents=True, exist_ok=True)

    ios_specs = [
        ("Icon-App-20x20@2x.png", 40),
        ("Icon-App-20x20@3x.png", 60),
        ("Icon-App-29x29@2x.png", 58),
        ("Icon-App-29x29@3x.png", 87),
        ("Icon-App-40x40@2x.png", 80),
        ("Icon-App-40x40@3x.png", 120),
        ("Icon-App-60x60@2x.png", 120),
        ("Icon-App-60x60@3x.png", 180),
        ("Icon-App-1024x1024.png", 1024),
    ]
    for name, px in ios_specs:
        save_png(base, ios_set / name, px)

    contents = {
        "images": [
            {
                "size": "20x20",
                "idiom": "iphone",
                "filename": "Icon-App-20x20@2x.png",
                "scale": "2x",
            },
            {
                "size": "20x20",
                "idiom": "iphone",
                "filename": "Icon-App-20x20@3x.png",
                "scale": "3x",
            },
            {
                "size": "29x29",
                "idiom": "iphone",
                "filename": "Icon-App-29x29@2x.png",
                "scale": "2x",
            },
            {
                "size": "29x29",
                "idiom": "iphone",
                "filename": "Icon-App-29x29@3x.png",
                "scale": "3x",
            },
            {
                "size": "40x40",
                "idiom": "iphone",
                "filename": "Icon-App-40x40@2x.png",
                "scale": "2x",
            },
            {
                "size": "40x40",
                "idiom": "iphone",
                "filename": "Icon-App-40x40@3x.png",
                "scale": "3x",
            },
            {
                "size": "60x60",
                "idiom": "iphone",
                "filename": "Icon-App-60x60@2x.png",
                "scale": "2x",
            },
            {
                "size": "60x60",
                "idiom": "iphone",
                "filename": "Icon-App-60x60@3x.png",
                "scale": "3x",
            },
            {
                "size": "1024x1024",
                "idiom": "ios-marketing",
                "filename": "Icon-App-1024x1024.png",
                "scale": "1x",
            },
        ],
        "info": {"version": 1, "author": "xcode"},
    }
    (ios_set / "Contents.json").write_text(
        json.dumps(contents, indent=2) + "\n", encoding="utf-8"
    )

    print("Wrote Android mipmaps, drawable foregrounds, iOS icons, src/assets/images/app-icon.png")


if __name__ == "__main__":
    main()
