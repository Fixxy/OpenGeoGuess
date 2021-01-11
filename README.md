# OpenGeoGuess
 Just a little weekend project. It's a client-side Geoguessr clone. One of the buttons looks for a new panorama, and another one checks if your guess was correct. Uses Google Street View for panoramas and Leaflet as a map engine. Just put your Google API key in index.html (replace 'YOUR_GOOGLE_API_KEY') ([DEMO](https://jsfiddle.net/Fixxy/j6w1gL9q/))

![screenshot](https://raw.githubusercontent.com/Fixxy/opengeoguess/master/screen.jpg)

## TODO
 - Better random coordinates (use OSM streets?)
 - Show distance difference
 - Authentication/Authorization and scores

## Installation
```shell
git clone https://github.com/Fixxy/opengeoguess.git
cd opengeoguess
npm install
```

## Dev
```shell
npm run dev
```

## Build
```shell
npm run build
```