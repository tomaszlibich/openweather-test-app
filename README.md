# openweather-test-app

This a simple web app demo for OpenWeather API usage.

Initially I was thinking of using one of popular frameworks as a base for building it (Angular, React or Vue), but eventually decided that for such a small functionality it would be an "overkill".

Therefore it uses a vanilla ES code supported by webpack with manually crafted config for transpiling it into browsers compatible javascript.

For Unit Tests the Jest framework has been used. Unit tests code is transpiled with Babel.

Just in order to speed up development of common visual and functional features, it also makes use of some 3rd party libraries:

- _Bootstap_ styling
- _momentjs_ for date / time formatting
- _animate.css_ for simple animations
- _axios_ for HTTP requests

## Installing dependencies

After cloning the source code from repository, please run

```
npm install
```

from the root folder.

## Testing the app

The app contains a set of simple unit tests in the src/tests folder. You can run them by executing

```
npm test
```

from the root folder.

## Running the app

Once all dependencies are installed, you can run dev version of the app by executing

```
npm start
```

from the same place. The app will be available in your browser at _http://localhost:8080_ in watch mode.

You can also build a minified production-ready version by executing

```
npm run build
```

which will run unit tests, create static files in a _public_ folder and then will run a local server to host the app at _http://localhost:7000_.
