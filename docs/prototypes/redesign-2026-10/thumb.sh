#!/bin/sh
# usage: ./thumb.sh option-d  -> thumbs/option-d.jpg from shots/option-d/mbu-home-light.png
set -e
k=$1; cp shots/$k/mbu-home-light.png thumbs/$k.png
sips --cropOffset 0 0 -c 800 1280 thumbs/$k.png --out thumbs/$k-crop.png >/dev/null
sips -Z 720 -s format jpeg -s formatOptions 70 thumbs/$k-crop.png --out thumbs/$k.jpg >/dev/null
rm thumbs/$k.png thumbs/$k-crop.png; ls -la thumbs/$k.jpg
