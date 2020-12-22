"use strict";

export type LocationModel = {
  city: String,
  country: String,
  isoCountryCode: String,
  postalCode: String,
  region: String,
  q: String,
};

export type WeatherModel = {
  location: LocationModel,
  main: {
    temp_min: Number,
    temp_max: Number,
    temp: Number,
    pressure: Number,
    humidity: Number,
    feels_like: Number,
  },
  weather: [
    {
      id: Number,
      main: String,
      description: String,
      icon: String,
    }
  ],
  wind: {
    speed: Number,
    deg: Number,
  },
  visibility: Number,
  sys: {
    country: String,
    id: Number,
    sunrise: Number,
    sunset: Number,
    type: Number,
  },
};
