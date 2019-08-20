import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Image, Text } from "react-native";
import MaterialList4 from "../symbols/MaterialList7";

export default class Untitled extends Component {
  render() {
    return (
      <View style={styles.root}>
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          hidden={true}
          style={styles.statusBar}
        />
        <Image
          source={require("../assets/images/I4BYPBXLE8.jpg")}
          resizeMode={"stretch"}
          style={styles.image2}
        />
        <Text style={styles.text}>Kh.adham .jsx</Text>
        <Text style={styles.text2}>kampretosJr@Gmail.com</Text>
        <MaterialList4 style={styles.materialList4} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  statusBar: {},
  image2: {
    top: 10.78,
    left: 12.25,
    width: 60.46,
    height: 60.46,
    position: "absolute",
    borderRadius: 20
  },
  text: {
    top: 89.36,
    left: 10.01,
    width: 254.07,
    height: 32.6,
    color: "#121212",
    position: "absolute",
    fontSize: 28,
    fontWeight: "bold"
  },
  text2: {
    top: 121.97,
    left: 12.25,
    width: 251.82,
    height: 24.73,
    color: "#121212",
    position: "absolute",
    fontSize: 16
  },
  materialList4: {
    top: 146.7,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute"
  }
});
