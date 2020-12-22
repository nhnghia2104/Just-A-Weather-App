const round = (value, decimals) =>
  Number(Math.round(value + "e" + decimals) + "e-" + decimals);

class Calculator {
  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    return (
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2)
    );
  }

  kelvinToCelsius(input) {
    if (typeof input !== "number") {
      throw new TypeError("Expected a number");
    }

    const res = input - 273.15;

    return round(res, 2);
  }
}
module.exports = Calculator;
