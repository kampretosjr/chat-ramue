import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { registPlayer } from "../public/redux/actions/player";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import GetLocation from 'react-native-get-location'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ImageSource: null,
      spinner: false,
      username: '',
      password: '',
      email: '',
      phone:'',
      latitude: null,
      longitude: null,
    };
  }
  componentDidMount = async () => {
    await this.getCurrentPosition()
}
getCurrentPosition() {
  GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
      .then(location => {
          console.warn(location.latitude);

          let region = {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.00922 * 1.5,
              longitudeDelta: 0.00421 * 1.5
          }

          this.setState({
              mapRegion: region,
              latitude: location.latitude,
              longitude: location.longitude
          })
      })
      .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
      })
}

_handleRegister = () => {
  if (this.state.username === '' || this.state.email === '' || this.state.password === '') {
      alert('Oops form ada yang kosong isi dengan lengkap yah')
  } else {
      Auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((response) => {
              console.warn(response)
              Database.ref('/user/' + response.user.uid).set({
                  username: this.state.username,
                  email: this.state.email,
                  phone: this.state.phone,
                  status: 'offline',
                  avatar: 'https://res.cloudinary.com/dnqtceffv/image/upload/v1566043986/srhwjzljnfq79cg2glov.png',
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
              })
              this.props.navigation.navigate('Login')
          })
          .catch(error => {
              alert(error.message)
              this.setState({
                  fullname: '',
                  email: '',
                  password: ''
              })

              this.props.navigation.navigate('Register')
          })
  }
}
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response };
        this.setState({
          ImageSource: source
        });
      }
    });
  }
  render() {
    const registrasiAdd = () => {
      this.setState({
        spinner: true
      });
      const dataFile = new FormData();
      dataFile.append("username", this.state.username);
      dataFile.append("password", this.state.password);
      dataFile.append("email", this.state.email);
      dataFile.append("foto", {
        name: this.state.ImageSource.uri.fileName,
        type: this.state.ImageSource.uri.type || null,
        uri: this.state.ImageSource.uri.uri
      });
      add(dataFile);
    };
    let add = async data => {
      await this.props
        .dispatch(registPlayer(data))
        .then(() => {
          this.setState({
            spinner: false
          });
          alert("Success !!!");
          this.props.navigation.navigate('bridge');
        })
        .catch(err => {
          this.setState({
            spinner: false
          });
          alert("Gagal " + err);
        });
    };
    return (
      <View style={style.body}>
               {/* <Image resizeMode={"stretch"} source={require('../assets/images/l-20181108161436lagu-1.png')} style={style.img} /> */}

        <Spinner
        // visible={true}
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: "#fff" }}
        />
        <ScrollView>
          <View style={style.formLogin}>
            <TextInput
              style={style.textInput}
              placeholder="Username"
              onChangeText={username => this.setState({ username: username })}
            />
            <TextInput
              style={style.textInput}
              placeholder="Password"
              onChangeText={password => this.setState({ password: password })}
            />
            <TextInput
              style={style.textInput}
              placeholder="email"
              onChangeText={email => this.setState({ email: email })}
            />
            {this.state.ImageSource === null ? (
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View
                  style={{
                    minHeight: 100,
                    width: "100%",
                    paddingTop: 10
                  }}
                >
                  <Image
                    style={{
                      width: "35%",
                      height: 70,
                      backgroundColor: "green"
                    }}
                    source={require("../assets/images/ChaTraMue-Logo-17.jpg")}
                  />
                  <Text style={style.textPlease}>Upload your photos here</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View
                  style={{
                    minHeight: 100,
                    width: "100%",
                    paddingTop: 10
                  }}
                >
                  <Image
                    style={{
                      width: "35%",
                      height: 70,
                      backgroundColor: "green"
                    }}
                    source={this.state.ImageSource.uri}
                  />
                  <Text style={style.textPlease}>Upload your photos here</Text>
                </View>
              </TouchableOpacity>
            )}

            <Button
              color="#20a8e0"
              title="Sign Up"
              onPress={registrasiAdd.bind(this)}
              accessibilityLabel="Learn more about this purple button"
            />
            {/* <Button onPress={registrasiAdd.bind(this)} style={{top: 38.45}} block success>
              <Text>login</Text>
            </Button> */}
          </View>
        </ScrollView>
        <View style={style.footer}>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text>You have an account yet?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(Register);

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  textlogin: {
    position: "absolute",
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginTop: "9%",
    marginLeft: "3%"
  },
  img: {
    left: "0%",
    width: 360,
    height: 576.13,
    position: "absolute",
    opacity: 0.25
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
    marginTop: "10%",
    marginLeft: "39%",
    color: "#f79237",
    position: "absolute",
    fontSize: 14
  },
  formLogin: {
    top:"50%",
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