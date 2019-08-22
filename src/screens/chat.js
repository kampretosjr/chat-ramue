import React, { Component } from 'react'
import { StyleSheet, AsyncStorage as storage } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Header, Left, Icon, Body, Thumbnail, Right, Button, Title, Subtitle } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MarqueeText from 'react-native-marquee'
import firebase from 'firebase'
import { Database, Auth } from '../public/firebaseConfig'

export class Chat extends Component {
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
       
        Database.ref('messages').child(Auth.currentUser.uid).child(this.state.datauser.id)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messages: GiftedChat.append(prevState.messages, value.val())
                    }
                })
            })

        // this.setState({
        //     messages: [
        //         {
        //             _id: 1,
        //             text: 'Hello Developer',
        //             createdat: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'Ucing Gelo',
        //                 avatar: 'https://placeimg.com/140/140/any'
        //             }
        //         }
        //     ]
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
        const { datauser } = this.state
        // console.warn('Data user: ', datauser.id)
        // console.warn('current id: ', Auth.currentUser.uid)
        return (
            <>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('friendlist')}
                        >
                            <Icon name="arrow-round-back" type="Ionicons" style={styles.iconStyle} />
                        </Button>
                    </Left>
                    <Body>
                        <Thumbnail source={{ uri: datauser.avatar }} rounded style={styles.avatar} />
                    </Body>
                    <Body style={{ marginLeft: -60, width: 500 }}>
                        <MarqueeText
                            style={{ fontSize: 24 }}
                            duration={3000}
                            marqueeOnStart
                            loop
                            marqueeDelay={1000}
                            marqueeResetDelay={1000}
                        >
                            <Title>{datauser.username}</Title>
                        </MarqueeText>
                        <Subtitle>{datauser.status}</Subtitle>
                    </Body>
                    <Right>
                      <Button transparent onPress={() => alert('pencetan')}>
                        <Icon name="videocam" type="Ionicons" style={styles.iconStyle} />
                      </Button>
                      <Button transparent onPress={() => alert('pencetan')}>
                        <Icon name="call" type="Ionicons" style={styles.iconStyle} />
                      </Button>
                    </Right>
                </Header>
                <GiftedChat
                    text={this.state.text} showUserAvatar={true}
                    messages={this.state.messages} onSend={this.onSend}
                    user={{
                        _id: Auth.currentUser.uid,
                        username: this.state.username,
                        avatar: this.state.avatar
                      }}
                    onInputTextChanged={(value) => this.setState({ text: value })}
                    isLoadingEarlier={true}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderColor: 'white',
        borderWidth: 1
    },
    iconStyle: {
        color: 'white',
        marginHorizontal: 10
    }
})

export default Chat