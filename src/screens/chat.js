import React, { Component } from 'react'
import { Text, View,StyleSheet, AsyncStorage as storage } from 'react-native'
import { Header, Left, Icon, Body, Thumbnail, Right, Button, Title, Subtitle } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import MarqueeText from 'react-native-marquee'
import { GiftedChat } from 'react-native-gifted-chat'
import { Database, Auth } from '../public/firebaseConfig'
import firebase from 'firebase'

export class chat extends Component {
  constructor(props) {
		super(props)
		this.state = {
      messages: [],
      datauser: this.props.navigation.getParam('data'),
      text: '',
      avatar: '',
      username: ''
      }
      storage.getItem('avatar', (err, result) => {
        if (result) {
            this.setState({
                avatar: result
            })
        }
    })

    storage.getItem('username', (err, result) => {
        if (result) {
            this.setState({
                username: result
            })
        }
    })
		}
  componentWillMount() {
    console.warn('uid1 saya', Auth.currentUser.uid)
    console.warn('uid2 target ', this.state.datauser.id)
    Database.ref('messages').child(this.state.datauser.id).child(Auth.currentUser.uid)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messages: GiftedChat.append(prevState.messages, value.val())
                    }
                })
            })
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),

    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // })
  }

  
  onSend = () => {

    if (this.state.text.length > 0) {
        let msgId = Database.ref('messages').child(Auth.currentUser.uid).child(this.state.datauser.id).push().key
        let updates = {}
        let message = {
            _id: msgId,
            text: this.state.text,
            createdAt: new Date(),
            user: {
                _id: Auth.currentUser.uid,
                username: this.state.username,
                avatar: this.state.avatar
            }
        }
        updates['messages/' + Auth.currentUser.uid + '/' + this.state.datauser.id + '/' + msgId] = message
        updates['messages/' + this.state.datauser.id + '/' + Auth.currentUser.uid + '/' + msgId] = message

        Database.ref().update(updates)
        this.setState({ text: '' })
    }
}


  render() {
    return (
      <GiftedChat 
        text={this.state.text} messages={this.state.messages}
        onInputTextChanged={(value) => this.setState({ text: value })}
        onSend={this.onSend} isLoadingEarlier={true}
        user={{
              id: this.state.datauser.id,
              username: this.state.username,
              avatar: this.state.avatar
          }}
      />
    )
  }
}

export default chat
