"use strict";

import * as Location from "expo-location";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

import { isDebugData, weatherApiKey, weatherApiUrl } from "../config";
import { LocationModel, WeatherModel } from "../models/view";
import TestDataService from "./testdata";

class Service {
  async getCurrentLocation() {
    if (isDebugData) {
      return {
        status: 1,
        data: [],
      };
    }
    var response: LocationModel = null;
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return {
          status: -1,
          message: "Permission to access location was denied",
        };
      }

      Location.setGoogleApiKey("AIzaSyBRVyAa3f_pF9zMoBQLYg_Q3QHUZTuZV-Q");

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      let { coords } = location;

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });

        if (regionName) {
          let cityName = regionName[0].city.replace(/ /g, "");
          let q = cityName + "," + regionName[0].isoCountryCode;
          response = {
            city: regionName[0].city,
            country: regionName[0].country,
            isoCountryCode: regionName[0].isoCountryCode,
            postalCode: regionName[0].postalCode,
            region: regionName[0].region,
            q: q,
          };
        }
      }
    } catch (error) {
      console.log("Your location could not be found");
      let status = Location.getProviderStatusAsync();
      return {
        status: 0,
        message: "Your location could not be found",
        locationServicesEnabled: await status,
      };
    }
    return {
      status: 1,
      message: "completed",
      data: response,
    };
  }

  async getWeather(location: LocationModel) {
    if (isDebugData) {
      const test = new TestDataService();
      return test.getRandomData();
    }
    var data: WeatherModel = null;

    var url = `${weatherApiUrl}/weather?q=${location.q}&appid=${weatherApiKey}`;

    try {
      let responseWeather = await fetch(url);
      const result = await responseWeather.json();
      console.log(result);
      data = {
        location: location,
        main: result.main,
        sys: result.sys,
        weather: result.weather,
        wind: result.wind,
        visibility: result.visibility,
      };

      return {
        data: data,
        status: 1,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 0,
        message: "An error occurred!",
      };
    }
  }
}

module.exports = Service;
