"""Genera una copia de la landing con estilos, scripts y recursos integrados."""

from base64 import b64encode
from functools import cache
from mimetypes import guess_type
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
ASSET_PATH = re.compile(
    r"(?P<quote>['\"]?)(?P<path>(?:\.\./)?assets/[\w./-]+\.(?:woff2|webp|jpe?g|png|svg|avif))(?P=quote)"
)


@cache
def data_uri(path):
    media_type = guess_type(path)[0]
    content = b64encode(path.read_bytes()).decode("ascii")
    return f"data:{media_type};base64,{content}"


def inline_assets(source, base):
    def replace(match):
        quote = match["quote"]
        return f"{quote}{data_uri((base / match['path']).resolve())}{quote}"

    return ASSET_PATH.sub(replace, source)


def replace_stylesheet(match):
    path = ROOT / match[1]
    css = inline_assets(path.read_text(encoding="utf-8"), path.parent)
    return f"<style>\n{css}</style>"


def main():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    html = re.sub(r'  <link rel="preload"[^>]+>\n', "", html)
    html = re.sub(r'  <meta property="og:image(?::alt)?"[^>]+>\n', "", html)
    paths = re.findall(r'<script src="(js/[^"]+)" defer></script>', html)
    html = re.sub(r'  <script src="js/[^"]+" defer></script>\n', "", html)
    html = inline_assets(html, ROOT)
    html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', replace_stylesheet, html)

    scripts = []
    for path in paths:
        source = inline_assets((ROOT / path).read_text(encoding="utf-8"), ROOT)
        scripts.append(f"<script>\n{source}</script>")
    html = html.replace("</body>", "\n".join(scripts) + "\n</body>")
    (ROOT / "alquimia-autonoma.html").write_text(html, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    main()
