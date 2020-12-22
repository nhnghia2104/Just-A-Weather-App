/**
 * @flow
 */

"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

class Loading extends Component {
  render() {
    return (
      <View style={styles.loadingView}>
        <View style={styles.loadingHeader}>
          <Text style={styles.loadingText}>Loading...</Text>
          <Image source={require("../assets/sunny.gif")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingView: {
    // backgroundColor: "#fff",
    flex: 1,
  },
  loadingHeader: {
    height: "100%",
    backgroundColor: "#64a6bd",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginBottom: 18,
  },
});

module.exports = Loading;
// export default Loading;
