import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "@builderx/icons";

export default class MaterialRightIconTextbox7 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TextInput
          placeholder={"Email"}
          placeholderTextColor={"rgba(0,0,0,1)"}
          style={styles.inputStyle}
        />
        <Icon
          name={"email-open-outline"}
          type={"MaterialCommunityIcons"}
          style={styles.iconStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  inputStyle: {
    width: "91.47%",
    height: "95.4%",
    color: "#000",
    marginRight: 0,
    paddingTop: 14,
    paddingRight: 0,
    paddingBottom: 8,
    paddingLeft: 14,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  iconStyle: {
    color: "rgba(124,149,83,1)",
    fontFamily: "roboto-regular",
    fontSize: 24,
    paddingRight: 8,
    marginRight: 0
  }
});
