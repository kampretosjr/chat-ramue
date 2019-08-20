import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "@builderx/icons";

export default class MaterialRightIconTextbox4 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TextInput
          onChangeText={email => this.setState({ email: email })}
          placeholderTextColor={"#000000"}
          placeholder={this.props.placeholder}

          style={styles.inputStyle}
        />
        <Icon
          name={this.props.ikon}
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
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 4,
    paddingRight: 0,
    paddingBottom: 4,
    paddingLeft: 18,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  iconStyle: {
    color: "#AE0015",
    fontFamily: "roboto-regular",
    fontSize: 24,
    paddingRight: 8
  }
});
