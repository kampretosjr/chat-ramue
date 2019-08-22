import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, AsyncStorage } from 'react-native'
import { List, ListItem, Left, Icon, Body, Right,Footer } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Center } from "@builderx/utils";

import { Database, Auth } from '../public/firebaseConfig'

export class Drawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            avatar: '',
            username: '',
            uid:''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('email', (err, result) => {
            if (result) {
                this.setState({ email: result })
            }
        })

        AsyncStorage.getItem('username', (err, result) => {
            if (result) {
                this.setState({ username: result })
            }
        })

        AsyncStorage.getItem('avatar', (err, result) => {
            if (result) {
                this.setState({ avatar: result })
            }
        })
    }

    _handleLogout = async () => {
        const userToken = await AsyncStorage.getItem('userid');
        await this.setState({ 
          uid : AsyncStorage.getItem('userid')
        })
        console.log(userToken)
        Database.ref('/user/' + userToken).update({ status: "offline" })
        Auth.signOut().then(() => {
          alert("berhasil logout")
            AsyncStorage.clear();
            this.props.navigation.navigate('auth');
        }).catch(error => { alert(error.message) })
    }
     render() {
        const { email, username, avatar } = this.state
        return (
            <View style={styles.container}>
            { this.state.email !== "" ?  
                <>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')}>

                  <View style={styles.background}>
                    <Image style={styles.imgBackground} source={require('../assets/images/ChaTraMue-Logo-17.jpg')} resizeMode="stretch" />
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                  </View>
                
                  <View style={styles.viewProfileData}>
                    <Text style={styles.txtusername}>{username}</Text>
                    <Text style={styles.txtEmail}>{email}</Text>
                  </View>

                </TouchableOpacity>

                <List>
                  
                  
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('friendlist')}>
                      <ListItem>
                        <Left>
                          <Text style={styles.txtMenu}><Icon name="contacts" type="Ionicons" style={styles.iconStyle} /> Friend List</Text>
                        </Left>
                      </ListItem>
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}>
                    <ListItem>
                      <Left>
                        <Text style={styles.txtMenu}><Icon name="navigate" type="Ionicons" style={styles.iconStyle} /> Friend location</Text>
                      </Left>
                    </ListItem>
                  </TouchableOpacity>
                </List> 
                <List style={{top:"40%"}}>
                  <TouchableOpacity onPress={() => this._handleLogout()}>
                    <ListItem >
                      <Left>
                        <Text style={styles.txtMenu}><Icon name="share-alt" type="Ionicons" style={[styles.iconStyle, { color: 'red' }]} /> Logout</Text>
                      </Left>
                    </ListItem>
                  </TouchableOpacity>
                </List>
            </> 
            :
            <View style={{flex: 1}}>
              <Image
                source={require("../assets/images/photo-1476297587631-7c59d0c57a02.jpeg")}
                resizeMode={"stretch"}
                style={styles.bekgron}
              />
              <Text style={styles.tulisan}> anda belum login </Text>
            </View>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  bekgron: {
    top: 0,
    left: "-190%",
    width: "290.29%",
    height: "100%",
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    opacity: 0.63
  },
  tulisan: {
    top: 53.43,
    left: "0%",
    backgroundColor: "rgba(230, 230, 230,1)",
    color: "#121212",
    position: "absolute",
    borderColor: "#000000",
    borderWidth: 4,
    fontSize: 34
  },
    txtMenu: {
        fontSize: 14,
        width: '100%'
    },
    iconStyle: {
        color: 'black',
        fontSize: 30,
    },
    txtEmail: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    txtusername: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 5
    },
    viewProfileData: {
        position: 'absolute',
        top: 100,
        alignSelf: 'center'
    },
    avatar: {
        position: 'absolute',
        top: 25,
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 100 / 2
    },
    background: {
        backgroundColor: '#4054b5',
    },
    imgBackground: {
        width: '100%',
        height: 180,
        opacity: 0.6,
    },
    container: {
        flex: 1
    }
})

export default Drawer