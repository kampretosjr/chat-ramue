import React, { Component } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";

export default class MaterialList4 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <FlatList
          renderItem={({ item, separators }) => (
            <View style={styles.rowBgColor}>
              <Image
                source={require("../assets/images/ChaTraMue-Logo-17.jpg")}
                style={styles.avatarImageStyle}
              />
              <View style={styles.contentColor}>
                <Text style={styles.rowText}>Single-line Item</Text>
              </View>
            </View>
          )}
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          style={styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 8
  },
  list: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  rowBgColor: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16
  },
  avatarImageStyle: {
    width: 40,
    height: 40,
    backgroundColor: "#CCCCCC",
    borderRadius: 20
  },
  contentColor: {
    left: 72,
    height: 56,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    paddingRight: 16
  },
  rowText: {
    color: "#212121",
    fontSize: 16
  }
});
