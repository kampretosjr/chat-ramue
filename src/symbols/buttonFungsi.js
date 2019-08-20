import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@builderx/icons";

export default class MaterialButtonShare extends Component {
  render() {
    return (
        <Icon
          name={this.props.ikon}
          type={"MaterialCommunityIcons"}
          style={styles.icon}
        />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(234,234,236,1)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
    borderRadius: 28,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  icon: {
    color: "rgba(234,234,236,1)",
    fontFamily: "roboto-regular",
    fontSize: 54,
    alignSelf: "center",
    transform: [
      {
        rotate: "-90.00deg"
      }
    ]

  }
});
