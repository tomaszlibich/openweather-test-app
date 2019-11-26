import mockAxios from "axios";
import { weatherLoader } from "../weather-loader";

const successCallback = jest.fn();
const mockWeatherData = {
  list: [
    {
      weather: [{ description: "xyz", icon: "abc" }],
      main: {
        temp: 13
      },
      wind: {
        speed: 12
      }
    }
  ]
};

let city;

describe("Weather loader", () => {
  beforeEach(() => {
    mockAxios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockWeatherData
      })
    );
  });

  describe("load", () => {
    describe("When city the weather is requested for is Paris", () => {
      beforeEach(() => {
        city = "Paris";
      });

      describe("And method is invoked", () => {
        beforeEach(() => {
          weatherLoader.load(city, successCallback);
        });

        it("It fetches data from OpenWeatherMap API", () => {
          expect(mockAxios.get).toHaveBeenCalledWith(
            "http://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&cnt=5&appid=db3ec05a2fc068a4021f90e34793c8c5"
          );
        });

        it("It parses data correctly and returns formatted to method invoker", () => {
          expect(successCallback).toHaveBeenCalledWith([
            { description: "xyz", icon: "abc", temp: 13, wind: 12 }
          ]);
        });
      });
    });
  });
});
