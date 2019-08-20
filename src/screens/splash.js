import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image,ActivityIndicator } from "react-native";

export default class Untitled extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet incididunt laborex
        </Text>
        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet incididunt laborex
        </Text>
        <TouchableOpacity style={styles.button} onPress={ ()=> {
              this.props.navigation.navigate('register')
            }}>
          <Image
            source={require("../assets/images/ChaTraMue-Logo-17.jpg")}
            resizeMode={"contain"}
            style={styles.image}
          />
        </TouchableOpacity>
        <ActivityIndicator style={{top:"90%"}} large>

        </ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  text: {
    top: 592.58,
    textAlign: 'center',    width: "100%",
    height: "3.64%",
    color: "rgba(238,65,43,1)",
    position: "absolute",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal"
  },
  text2: {
    top: 0,
    textAlign: 'center',
    width: "100%",
    height: 22.42,
    color: "rgba(238,65,43,1)",
    position: "absolute",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal"
  },
  button: {
    top: 202.95,
    left: 0,
    width: 362,
    height: 209.1,
    // backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute"
  },
  image: {
    top: -5.09,
    left: 0,
    width: 360,
    height: 219.28,
    position: "absolute"
  }
});
