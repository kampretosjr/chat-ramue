import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

class Login extends Component {
  render() {
    return (
      <View style={style.body}>
        <View>
          <Image
            style={{
              width: "100%",
              height: 120
            }}
            source={require("../Assets/img/Vector.png")}
          />
          <Text style={style.textlogin}> SIGN IN </Text>
          <Text style={style.textKuy}>Kuy Musik</Text>
          <Text style={style.textJos}>Jos Jos Aye Aye</Text>
          <Text style={style.textGame}>Game</Text>
          <Text style={style.textPlease}>Welcome, Please login here</Text>
        </View>
        <View style={style.formLogin}>
          <TextInput style={style.textInput} placeholder="Username" />
          <TextInput style={style.textInput} placeholder="Password" />
          <Button
            color="#20a8e0"
            title="Sign In"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View style={style.footer}>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
            <Text>Forget Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;


  body: {
    flex: 1,
    backgroundColor: "white"
  },
  textlogin: {
    position: "absolute",
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginTop: "9%",
    marginLeft: "3%"
  },
  textKuy: {
    marginTop: "19%",
    marginLeft: "50%",
    color: "#f79237",
    position: "absolute",
    fontSize: 38,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  textJos: {
    marginTop: "30%",
    marginLeft: "64%",
    color: "#f79237",
    position: "absolute",
    fontSize: 14
  },
  textGame: {
    marginTop: "20%",
    marginLeft: "58%",
    color: "#f79237",
    position: "absolute",
    fontSize: 14
  },
  textPlease: {
    marginTop: "55%",
    margin: "25%",
    color: "#f79237",
    position: "absolute",
    fontSize: 14
  },
  formLogin: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: "10%"
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 24,
    marginBottom: "5%",
    padding: 10
  },
  footer: {
    flexDirection: "row",
    margin: "3%"
  }
});