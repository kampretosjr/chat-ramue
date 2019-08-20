import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,AsyncStorage as storage
} from "react-native";
import Icon from "@builderx/icons";
import { Center } from "@builderx/utils";
import MaterialRightIconTextbox4 from "../symbols/Input";
import MaterialButtonShare1 from "../symbols/buttonLogin";
import { Database, Auth } from '../public/firebaseConfig'


export default class Login extends Component {
	constructor(props) {
    super(props)

    this.state = {
        users: [],
        email: '',
        password: ''
    }
}
_handleLogin = async () => {
  const { email, password } = this.state
  if (email === '' || password === '') {
      alert('Oops form ada yang kosong isi dengan lengkap yah')
  } else {
      Database.ref('/user').orderByChild('email').equalTo(email).once('value', (result) => {
          let data = result.val()
          console.warn("datanya: ", data)

          if (data !== null) {
              let users = Object.values(data)

              storage.setItem('email', users[0].email)
              storage.setItem('username', users[0].username)
              storage.setItem('avatar', users[0].avatar)
              console.warn("datapribadi", users[0])
          }
      })

      await Auth.signInWithEmailAndPassword(email, password)
          .then((response) => {
              Database.ref('/user/' + response.user.uid).update({ status: 'online' })
              storage.setItem('userid', response.user.uid)
              this.props.navigation.navigate('auth')
          })
          .catch(error => {
              alert(error.message)
              this.setState({
                  email: '',
                  password: ''
              })
          })
  }
}
  render() {
    return (
      <View style={styles.root}>
        <Image
          source={require("../assets/images/photo-1476297587631-7c59d0c57a02.jpeg")}
          resizeMode={"stretch"} style={styles.image}/>
        
        <Center horizontal>
          <Text style={styles.text3}>Login</Text>

          <View style={styles.usernameStyle}>
            <TextInput onChangeText={email => this.setState({ email: email })} placeholder={"eamail"} style={styles.inputStyle}/>
            <Icon name={"email"} style={styles.iconStyle} type={"MaterialCommunityIcons"}/>
          </View>

          <View style={styles.passwordStyle}>
            <TextInput
              onChangeText={password => this.setState({ password: password })} placeholder={"pasword"} secureTextEntry={true} style={styles.inputStyle}
            />
            <Icon name={"eye"} style={styles.iconStyle} type={"MaterialCommunityIcons"}/>
          </View>
        </Center>

        <TouchableOpacity onPress={() => this._handleLogin()} style={styles.buttonkanan}>
          <Icon name={"logout-variant"} type={"MaterialCommunityIcons"} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={ ()=> { this.props.navigation.navigate('register')}} style={styles.button}>
          <Text style={styles.text}>belom punya akun? yaa daftar dulu lah</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
	button2: {
    top: 326.57,
    left: 284.31,
    width: 57.33,
    height: 58.46,
    position: "absolute"
  },
  icon: {
    color: "#fff",
    fontFamily: "roboto-regular",
    fontSize: 39,
    alignSelf: "center"
  },
  buttonkanan: {
    
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
    shadowRadius: 1.2,
		top: 326.57,
    left: 284.31,
    width: 56,
    height: 56,
    position: "absolute",
    borderColor: "#000000",
    borderWidth: 2
  },
  root: {
    flex: 1,
    backgroundColor: "rgba(238,65,43,1)",
    opacity: 1
  },
  image: {
    top: -106.46,
    left: -459.9,
    width: "246.07%",
    height: "117.31%",
    position: "absolute",
    opacity: 0.94
  },
  statusBar: {},
  scrollArea: {
    top: "3.78%",
    left: "0%",
    width: 361,
    height: 361.93,
    position: "absolute"
  },
  scrollArea_contentContainerStyle: {
    width: 361,
    height: 361.93
  },
  passwordStyle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    top: 192.57,
    width: 315.78,
    height: 42.99,
    backgroundColor: "rgba(234,234,236,1)",
    position: "absolute",
    opacity: 1,
    borderRadius: 1,
    borderColor: "#000000",
    borderWidth: 2,
    borderBottomWidth: 2,
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9
  },
  usernameStyle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    top: 118.97,
    width: 315.74,
    height: 42.99,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    opacity: 1,
    borderRadius: 1,
    borderColor: "#000000",
    borderWidth: 2,
    borderBottomWidth: 2,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 1
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
  },
  text3: {
    top: 10.12,
    left: 20.5,
    width: 211.35,
    height: 66.33,
    color: "rgba(103,0,0,1)",
    position: "absolute",
    fontSize: 38
  },
  button: {
    top: 577.39,
    left: 15.63,
    width: "100%",
    height: 25.86,
    position: "absolute"
  },
  text: {
    top: -0.35,
    left: "1.73%",
    width: 318.5,
    height: 26.73,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal"
  },

});
