request = require("request");

const url1 =
  "https://api.darksky.net/forecast/d552a8683cef126488341bdf1d8e4468/37.8267,-122.4233";

request({ url: url1, json: true }, (error, response) => {
  if (error) {
    console.log("Oops, there's been an error");
  } else {
    const data = response.body;
    console.log(data.currently);
  }
});

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmVuOTMiLCJhIjoiY2p0N2RnNDlrMGpmMzQ5cGhyZmkzZjBxZiJ9.q9foO3b7YT8-GiXYN5JOUA`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Oops, can't connect to mapbox. Check network connection",
        undefined
      );
    } else if (response.body.features.length == 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

geocode("Ghana", (error, data) => {
  console.log("Error:", error);
  console.log("Data:", data);
});
