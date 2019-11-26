import { JSDOM } from "jsdom";
import moment from "moment";
import "@testing-library/jest-dom/extend-expect";
import { forecastHandler } from "../forecast-handler";

const dom = new JSDOM();
let day;
let index;
let dynamicFriendlyDate;
let result;

global.document = dom.window.document;
global.window = dom.window;

describe("Forecast handler", () => {
  describe("getDayComponent", () => {
    describe("When data returned by API is of correct format", () => {
      beforeEach(() => {
        day = {
          temp: 7,
          wind: 8,
          icon: "icon_file",
          description: "this is description"
        };
      });

      const makeCommonForecastAssertions = () => {
        it("It renders a day component wrapped by unordered list", () => {
          expect(result).toContainHTML(
            '<ul class="card animated fadeIn forecast-items">'
          );
        });

        it("It renders a temperature section correctly", () => {
          expect(result).toContainHTML(
            '<li class="forecast-item-temp"><span>7 ° C</span></li>'
          );
        });

        it("It renders a description section correctly", () => {
          expect(result).toContainHTML(
            '<li class="forecast-item-description"><span>this is description</span></li>'
          );
        });
      };

      describe("And index provided is of value 0", () => {
        beforeEach(() => {
          index = 0;
        });

        describe("And method is invoked", () => {
          beforeEach(() => {
            result = forecastHandler.getDayComponent(day, index);
          });

          it("It renders a datetime section correctly with Today friendly date", () => {
            expect(result).toContainHTML('<li class="datetime">Today</li>');
          });

          makeCommonForecastAssertions();
        });
      });

      describe("And index provided is of value 1", () => {
        beforeEach(() => {
          index = 1;
        });

        describe("And method is invoked", () => {
          beforeEach(() => {
            result = forecastHandler.getDayComponent(day, index);
          });

          it("It renders a datetime section correctly with Tomorrow friendly date", () => {
            expect(result).toContainHTML('<li class="datetime">Tomorrow</li>');
          });

          makeCommonForecastAssertions();
        });
      });

      describe("And index provided is of value 2", () => {
        beforeEach(() => {
          index = 2;
          dynamicFriendlyDate = moment()
            .add(index, "days")
            .format("dddd");
        });

        describe("And method is invoked", () => {
          beforeEach(() => {
            result = forecastHandler.getDayComponent(day, index);
          });

          it(`It renders a datetime section correctly with ${dynamicFriendlyDate} friendly date`, () => {
            expect(result).toContainHTML(
              `<li class="datetime">${dynamicFriendlyDate}</li>`
            );
          });

          makeCommonForecastAssertions();
        });
      });
    });
  });
});
