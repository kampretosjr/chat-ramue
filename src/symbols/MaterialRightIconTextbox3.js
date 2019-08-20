import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "@builderx/icons";

export default class MaterialRightIconTextbox3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TextInput
          placeholder={"Username"}
          placeholderTextColor={"rgba(16,15,15,1)"}
          style={styles.inputStyle}
        />
        <Icon
          name={"account"}
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
    backgroundColor: "rgba(218,35,35,0)",
    flexDirection: "row",
    alignItems: "center",
    opacity: 1,
    borderColor: "rgba(15,8,20,1)",
    borderWidth: 0
  },
  inputStyle: {
    flex: 1,
    color: "rgba(19,19,19,1)",
    alignSelf: "stretch",
    margin: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 1,
    marginLeft: 17,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 8,
    shadowOpacity: 1,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  iconStyle: {
    color: "rgba(124,149,83,1)",
    fontFamily: "roboto-regular",
    fontSize: 24,
    paddingRight: 8,
    margin: 0,
    marginLeft: 17,
    marginBottom: 1,
    marginTop: 0,
    marginRight: 0
  }
});
