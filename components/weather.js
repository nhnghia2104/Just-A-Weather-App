import React, { Component } from "react";
import Loading from "./loading";
import type { WeatherModel, LocationModel } from "../models/view";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Linking,
  AppState,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import Service from "../services/service";
import Calculator from "../services/calculator";

const service = new Service();
const cal = new Calculator();
const renderForecastImage = require("./forecastimage");

class Weather extends Component {
  state = {
    isLocationModalVisible: false,
    isLoading: true,
    appState: AppState.currentState,
    message: "",
    weather: null,
  };

  UNSAFE_componentWillMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    this.getWeather();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      this.setState();
    }
    this.setState({ appState: nextAppState });
  };

  async getWeather() {
    var result = await service.getCurrentLocation();
    if (result.status == -1) {
      this.setState({
        isLocationModalVisible: true,
        message: result.message,
      });
    }
    if (result.status == 0) {
    }
    if (result.status == 1) {
      var location = result.data;
      var weatherResult = await service.getWeather(location);
      console.log(weatherResult);
      this.setState({
        isLoading: false,
        isLocationModalVisible: false,
        weather: weatherResult.data,
      });
    }
  }

  openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    this.setState({ openSetting: false });
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    if (this.state.isLocationModalVisible) {
      return (
        <Modal
          onModalHide={this.state.openSetting ? this.openSetting : undefined}
          isVisible={this.state.isLocationModalVisible}
        >
          <View style={styles.modal}>
            <Button
              onPress={() =>
                this.setState({
                  openSetting: true,
                  isLocationModalVisible: false,
                })
              }
              title="Enable Location Service"
            />
          </View>
        </Modal>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.weather}>
          <StatusBar barStyle="light-content" />
          <Text style={[styles.textCity, { marginTop: 50 }]}>
            {this.state.weather.location.city}
          </Text>
          <Text style={[styles.textDescription, { marginTop: 8 }]}>
            {this.state.weather.weather[0].description}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            {renderForecastImage(this.state.weather.weather[0].icon, 80, 80)}
            <Text style={[styles.textTemp, { marginLeft: 10 }]}>
              {cal.kelvinToCelsius(this.state.weather.main.temp)}°
            </Text>
          </View>
          {this.renderBottomView()}
        </SafeAreaView>
      </View>
    );
  }

  renderBottomView() {
    return (
      <ScrollView style={styles.bottomView}>
        <Text style={[styles.textAlert]}>
          TODAY: {this.state.weather.weather[0].description} currently. The high
          will be {cal.kelvinToCelsius(this.state.weather.main.temp_max)}°. The
          low will be {cal.kelvinToCelsius(this.state.weather.main.temp_min)}°
        </Text>

        <View style={styles.rowView}>
          <View style={styles.colView}>
            <Text style={styles.textTitle}>SUNRISE</Text>
            <Text style={styles.textValue}>
              {cal.timestampToTime(this.state.weather.sys.sunrise)}
            </Text>
          </View>
          <View style={styles.colView}>
            <Text style={styles.textTitle}>SUNSET</Text>
            <Text style={styles.textValue}>
              {cal.timestampToTime(this.state.weather.sys.sunset)}
            </Text>
          </View>
        </View>

        <View style={styles.rowView}>
          <View style={styles.colView}>
            <Text style={styles.textTitle}>WIND</Text>
            <Text style={styles.textValue}>
              {this.state.weather.wind.speed} km/h
            </Text>
          </View>
          <View style={styles.colView}>
            <Text style={styles.textTitle}>FEELS LIKE</Text>
            <Text style={styles.textValue}>
              {cal.kelvinToCelsius(this.state.weather.main.feels_like)}°
            </Text>
          </View>
        </View>

        <View style={styles.rowView}>
          <View style={styles.colView}>
            <Text style={styles.textTitle}>humidity</Text>
            <Text style={styles.textValue}>
              {this.state.weather.main.humidity}%
            </Text>
          </View>
          <View style={styles.colView}>
            <Text style={styles.textTitle}>pressure</Text>
            <Text style={styles.textValue}>
              {cal.kelvinToCelsius(this.state.weather.main.pressure)} hPa
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64a6bd",
  },

  bottomView: {
    flex: 1,
    position: "relative",
    bottom: 0,
    top: 0,
    width: "100%",
    marginTop: 50,
  },

  rowView: {
    flexDirection: "row",
    marginTop: 20,
  },
  colView: {
    flex: 1,
    position: "relative",
    top: 0,
    bottom: 0,
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25,
  },

  textAlert: {
    color: "#fff",
    fontSize: 18,
    paddingRight: 25,
    paddingLeft: 25,
  },

  textTitle: {
    color: "#edf2fb",
    fontSize: 14,
    textTransform: "uppercase",
  },

  textValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  weather: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  textCity: {
    fontSize: 26,
    fontWeight: "300",
    color: "#fff",
  },

  textTemp: {
    fontSize: 60,
    fontWeight: "400",
    color: "#fff",
  },

  textDate: {
    fontSize: 18,
    color: "#fff",
  },

  textDescription: {
    fontSize: 18,
    fontWeight: "400",
    textTransform: "capitalize",
    color: "#fff",
  },

  modal: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default Weather;
