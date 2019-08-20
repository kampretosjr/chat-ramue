import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@builderx/icons";
import { withNavigation } from 'react-navigation';


export class buttonLogin extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.destination)} 
      style={[styles.root, this.props.style]}>
        <Icon
          name={this.props.icon}
          type={"MaterialCommunityIcons"}
          style={styles.icon}
        />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(buttonLogin)


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(139,87,42,1)",
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
    color: "#fff",
    fontFamily: "roboto-regular",
    fontSize: 39,
    alignSelf: "center"
  }
});
