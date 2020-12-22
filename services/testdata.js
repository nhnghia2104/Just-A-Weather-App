"use strict";
class TestDataService {
  data = [
    {
      data: {
        location: {
          city: "London",
          country: "United Kingdom",
          isoCountryCode: "UK",
          postalCode: "",
          q: "London,UK",
          region: "",
        },
        main: {
          feels_like: 280.55,
          humidity: 76,
          pressure: 1007,
          temp: 286.18,
          temp_max: 287.15,
          temp_min: 285.37,
        },
        sys: {
          country: "GB",
          id: 1414,
          sunrise: 1608624271,
          sunset: 1608652437,
          type: 1,
        },
        visibility: 10000,
        weather: [
          {
            description: "broken clouds",
            icon: "04n",
            id: 803,
            main: "Clouds",
          },
        ],
        wind: {
          deg: 250,
          speed: 7.7,
        },
      },
      status: 1,
    },
    {
      data: {
        location: {
          city: "Mountain View",
          country: "United States",
          isoCountryCode: "US",
          postalCode: "94043",
          q: "MountainView,US",
          region: "California",
        },
        main: {
          feels_like: 270.1,
          humidity: 51,
          pressure: 1022,
          temp: 275.09,
          temp_max: 276.48,
          temp_min: 274.26,
        },
        sys: {
          country: "US",
          id: 3205,
          sunrise: 1608559864,
          sunset: 1608595138,
          type: 1,
        },
        visibility: 10000,
        weather: [
          {
            description: "clear sky",
            icon: "01n",
            id: 800,
            main: "Clear",
          },
        ],
        wind: {
          deg: 20,
          speed: 3.1,
        },
      },
      status: 1,
    },
  ];
  getRandomData() {
    var ranNumber = Math.floor(Math.random() * 10);
    var ranIdx = ranNumber % this.data.length;
    return this.data[ranIdx];
    // return this.data[0];
  }
}

module.exports = TestDataService;
