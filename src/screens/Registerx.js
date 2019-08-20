import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,TextInput
} from "react-native";
import Icon from "@builderx/icons";
import { Center } from "@builderx/utils";
import ImagePicker from "react-native-image-picker";
import Input from "../symbols/Input";
import { Database, Auth } from '../public/firebaseConfig'
import ButtonNavigate from "../symbols/buttonLogin";
import Button from "../symbols/buttonFungsi";
import GetLocation from 'react-native-get-location'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ImageSource: null,
      spinner: false,
      username: '',
      email: '',
      password: '',
      phone: '',
      test:'',
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
        alert('ngisi yang bener ,ada yg kosong tuh')
    } else {
        Auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                console.warn(response)
                Database.ref('/user/' + response.user.uid).set({
                    username: this.state.username,
                    phone: this.state.phone,
                    status: 'offline',
                    email: this.state.email,
                    avatar: 'https://res.cloudinary.com/dnqtceffv/image/upload/v1566043986/srhwjzljnfq79cg2glov.png',
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                })
                this.props.navigation.navigate('login')
            })
            .catch(error => {
                alert(error.message)
                

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
    console.log("usernmae",this.state.username)
    console.log("email",this.state.email)
    console.log("phone",this.state.phone)
    console.log("password",this.state.password)

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
      <View style={styles.root}>
        <Image
          source={require("../assets/images/photo-1476297587631-7c59d0c57a02.jpeg")}
          resizeMode={"stretch"}
          style={styles.image}
        />
        
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          hidden={true}
          style={styles.statusBar}
        />
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <Center horizontal>
            
            <View style={styles.USSRname}>
              <TextInput
                onChangeText={username => this.setState({ username: username })}
                placeholderTextColor={"#000000"} placeholder={"username"} style={styles.inputStyle}
              />
              <Icon name={"account"} style={styles.iconStyle} type={"MaterialCommunityIcons"}/>
            </View>

            <View style={styles.email}>
              <TextInput
                onChangeText={email => this.setState({ email: email })}
                placeholderTextColor={"#000000"} placeholder={"eamail"} style={styles.inputStyle}
              />
              <Icon name={"email"} style={styles.iconStyle} type={"MaterialCommunityIcons"}/>
            </View>
            
            <View style={styles.phone}>
              <TextInput
                onChangeText={phone => this.setState({ phone: phone })}
                placeholderTextColor={"#000000"} placeholder={"phone"} style={styles.inputStyle} keyboardType={"numeric"}
              />
              <Icon name={"phone"} style={styles.iconStyle} type={"MaterialCommunityIcons"}/>
            </View>


            <View style={styles.passwordnya}>
              <TextInput
                onChangeText={ password => this.setState({ password: password })}
                placeholderTextColor={"#000000"} placeholder={"password"} style={styles.inputStyle} secureTextEntry={true}
              />
              <Icon name={"eye"} style={styles.iconStyle} type={"MaterialCommunityIcons"}/>
            </View>
          </Center>
        </ScrollView>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={styles.uploadbutton}>
          <Button ikon={"arrow-right-bold-circle"}  />
        </TouchableOpacity>
        <Text style={styles.text2}>upload foto</Text>
        
        <TouchableOpacity onPress={() => this._handleRegister()} style={styles.materialButtonShare}>
          <Button ikon={"login-variant"}  />
        </TouchableOpacity>

        {/* <ButtonNavigate destination="home" icon={"login-variant"} style={styles.materialButtonShare} /> */}


        <Image
          source={require("../assets/images/ChaTraMue-Logo-17.jpg")}
          resizeMode={"contain"}
          style={styles.image2}
        />
        <Text style={styles.text3}>Register</Text>
        {this.state.ImageSource === null ? (
              <View
                  style={{
                    minHeight: 10,
                    width: "100%",
                    paddingTop: 10
                  }}
                >
                  <Image
                    style={{
                      top: 385.18,
                      left: 100.18,
                      width: 160.65,
                      height: 92.07,
                      position: "absolute"
                    }}
                    source={require("../assets/images/ChaTraMue-Logo-17.jpg")}
                  />
                </View>
            ) : (
              <View
                  style={{
                    minHeight: 1000,
                    width: "100%",
                    paddingTop: 10
                  }}
                >
                  <Image
                    style={{
                      top: 385.18,
                      left: 100.18,
                      width: 160.65,
                      height: 92.07,
                      position: "absolute"
                    }}
                    source={this.state.ImageSource.uri}
                  />
                </View>
            )}
            <TouchableOpacity onPress={ ()=> {
              this.props.navigation.navigate('login')
            }} style={styles.button2}>
          <Text style={styles.text}>sudah punya akun? langsung login aja</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(238,65,43,1)",
    opacity: 1
  },
  image: {
    top: -94.09,
    left: -108.53,
    width: "246.07%",
    height: "117.31%",
    position: "absolute",
    opacity: 0.94
  },
  
  text2: {
    top: 449.74,
    left: 20.5,
    width: 79.27,
    height: 27.51,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "italic"
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
  passwordnya: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    top: 268.57,
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
  email: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    top: 203.55,
    width: 315.61,
    height: 42.99,
    backgroundColor: "rgba(230,230,230,1)",
    position: "absolute",
    borderColor: "#000000",
    borderWidth: 2,
    borderBottomWidth: 2
  },
  phone: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    top: "38.12%",
    width: 315.74,
    height: 42.99,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    opacity: 1,
    borderColor: "#000000",
    borderWidth: 2,
    borderBottomWidth: 2
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
  USSRname: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    top: 71.97,
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
  uploadbutton: {
    flex: 1,
    backgroundColor: "rgba(139,87,42,1)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
    borderRadius: 28,
    top: 385.18,
    left: 20.5,
    width: 63.34,
    height: 64.56,
    position: "absolute"
  },
  rect: {
    top: 1.9,
    left: "6.44%",
    width: 56.03,
    height: 55.97,
    position: "absolute"
  },
  group: {
    top: "0%",
    left: "0%",
    width: "100.02%",
    height: "100.02%",
    position: "absolute"
  },
  materialButtonShare2: {
    top: 0,
    left: 0,
    width: 56,
    height: 56,
    backgroundColor: "rgba(191,117,52,1)",
    position: "absolute",
    transform: [
      {
        rotate: "-90.00deg"
      }
    ]
  },
  signinbutton: {
    top: 385.18,
    left: 292.99,
    width: 57.25,
    height: 64.56,
    position: "absolute"
  },
  materialButtonShare: {
    top: 385.18,
    left: 292.99,
    width: 57.25,
    height: 64.56,
    // top: 1.9,
    // left: 1.25,
    // width: 56,
    // height: 56,
    backgroundColor: "rgba(191,117,52,1)",
    position: "absolute",
    opacity: 1,
    shadowOpacity: 1
  },
  image2: {
    top: 385.18,
    left: 100.18,
    width: 160.65,
    height: 92.07,
    position: "absolute"
  },
  button2: {
    top: 569.4,
    left: 26.41,
    width: 306.91,
    height: 22.48,
    position: "absolute"
  },
  text: {
    top: -1.36,
    left: "0.95%",
    width: 302.37,
    height: 26.73,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal"
  },
  text3: {
    top: 10.12,
    left: 20.5,
    width: 211.35,
    height: 66.33,
    color: "rgba(103,0,0,1)",
    position: "absolute",
    fontSize: 38
  }
});
