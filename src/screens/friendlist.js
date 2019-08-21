import React, { Component } from 'react'
import { FlatList, AsyncStorage as storage } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right,Title, Thumbnail, Text,Button,Icon } from 'native-base';
import { Database } from '../public/firebaseConfig'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation'

export class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            data: []
        }
    }

    componentWillMount = async () => {
        let dbref = Database.ref('/user')
        let email = await storage.getItem('email')
        dbref.on('child_added', (val) => {
            let person = val.val()
            
            if (person.email === email) {
                email = person.email
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    render() {
        return (
          <Container>
            <Header >
              <Left >
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Button transparent>
                    <Icon name='arrow-back' />
                  </Button>
                </TouchableOpacity>
              </Left>
              <Body style={{color:"red"}}>
                <Title>Chat mu</Title>
              </Body>
            </Header>
            <Content>
            <FlatList
                data={this.state.users} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <List key={item.id}>
                      <ListItem avatar>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('profileTeman', { data: item })}>
                          <Left>
                            <Thumbnail source={{ uri: item.avatar }} />
                          </Left>
                        </TouchableOpacity>
                        <Body>
                          <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('chat', { data: item })}>
                            <Text>{item.username}</Text>
                            <Text note>{item.phone}</Text>
                          </TouchableOpacity>
                        </Body>
                        <Right>
                          <Text note>{item.status}</Text>
                        </Right>
                      </ListItem>
                    </List>
                  )
                }}
              />
            </Content>
          </Container>
        )
    }
}

export default withNavigation(UserList)