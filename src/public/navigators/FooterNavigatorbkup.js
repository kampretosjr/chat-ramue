import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";

class FooterNavigator extends Component {
  render() {
    return (
      <Fragment>
        <Footer style={{ position: "absolute", bottom: 0 }}>
          <FooterTab>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Icon name="person"/>
            </Button>
            <Button vertical>
              <Icon name="home" />
            </Button>
            <Button vertical>
              <Icon name="book" />
            </Button>
          </FooterTab>
        </Footer>
      </Fragment>
    );
  }
}

export default FooterNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30
  },
  inputIcon: {
    width: 25,
    height: 25,
    justifyContent: "center"
  }
});
