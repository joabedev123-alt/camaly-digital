"""
Gera as versões otimizadas de um screenshot de projeto do portfólio.

Uso:
    python scripts/optimize_media.py <imagem-original> <slug> [--index N]

Saídas:
    src/assets/work/<slug>[-N].webp      1600px de largura (desktop / case)
    src/assets/work/<slug>[-N]-sm.webp    800px de largura (cards / mobile)
    public/og/<slug>.jpg                  1200x630 (Open Graph — só para a imagem principal)

Depois, registre o projeto em src/data/projects.ts.
Requer Pillow (pip install pillow).
"""
import argparse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
WORK = ROOT / "src" / "assets" / "work"
OG = ROOT / "public" / "og"


def resize_width(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im.copy()
    h = round(im.height * width / im.width)
    return im.resize((width, h), Image.LANCZOS)


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("src")
    p.add_argument("slug")
    p.add_argument("--index", type=int, default=0, help="0 = capa; 1+ = galeria")
    a = p.parse_args()

    WORK.mkdir(parents=True, exist_ok=True)
    OG.mkdir(parents=True, exist_ok=True)

    im = Image.open(a.src).convert("RGB")
    # Screenshots muito altos viram 16:10 a partir do topo (a dobra é o que importa).
    max_h = round(im.width * 10 / 16)
    if im.height > max_h * 1.15:
        im = im.crop((0, 0, im.width, max_h))

    name = a.slug if a.index == 0 else f"{a.slug}-{a.index}"
    resize_width(im, 1600).save(WORK / f"{name}.webp", "WEBP", quality=80, method=6)
    resize_width(im, 800).save(WORK / f"{name}-sm.webp", "WEBP", quality=78, method=6)

    if a.index == 0:
        ratio = 1200 / 630
        crop_h = min(im.height, round(im.width / ratio))
        og = im.crop((0, 0, round(crop_h * ratio), crop_h)).resize((1200, 630), Image.LANCZOS)
        og.save(OG / f"{a.slug}.jpg", "JPEG", quality=82, optimize=True, progressive=True)

    print(f"ok  {name}")


if __name__ == "__main__":
    main()
