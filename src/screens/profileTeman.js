import React, { Component } from 'react';
import { Image,AsyncStorage ,StyleSheet, View} from 'react-native';
import { Container, Header, Content, Card, CardItem,Right, Thumbnail,Title, Text, Button, Icon, Left, Body } from 'native-base';
import { Database, Auth } from '../public/firebaseConfig'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CardShowcaseExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataProfile: this.props.navigation.getParam('data')
    }
  }


  render() {
    const { dataProfile } = this.state
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
            <Title>friend Bio</Title>
          </Body>
        </Header> 
        <View style={styles.group2}>
          <Image
            source={{ uri: dataProfile.avatar }}
            resizeMode={"stretch"}
            style={styles.image}
          />
          <View style={styles.group}>
            <Image
              source={{ uri: dataProfile.avatar }}
              resizeMode={"stretch"}
              style={styles.image2}
            />
          </View>
          <Text style={styles.text}>{dataProfile.username}</Text>
          <Text style={styles.text2}>{dataProfile.email}</Text>

          <Button style={{top: "11.33%",
    left: 243.82,width: "24.38%",
    height: "8.8%",}} danger><Text style={styles.caption}> edit </Text></Button>


          <Text style={styles.text3}>phone</Text>
        </View>

        <Text style={styles.text4}>{dataProfile.status}</Text>

        <Text style={styles.follow}>follow juga di </Text>
          <Card style={{top:"55%"}}>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right >
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="logo-facebook" />
              <Text>facebook</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="logo-youtube" />
              <Text>youtube</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="logo-twitter" />
              <Text>twitter</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             
           </Card>
        </Container>

    );
  }
}
const styles = StyleSheet.create({
  caption: {
    color: "#fff",
    left:10,
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "200"
  },
  root: {
    flex: 1
  },
  group2: {
    top: 56,
    left: 0,
    width: 361,
    height: 307.5,
    position: "absolute"
  },
  image: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.40,
  },
  group: {
    top: 34.85,
    left: 29.24,
    width: 128.3,
    height: 129.89,
    position: "absolute"
  },
  image2: {
    top: 0,
    left: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.94,
    borderRadius: 100

  },
  text: {
    top: 174.86,
    left: "8.1%",
    width: "71.63%",
    height: "15.53%",
    color: "#121212",
    position: "absolute",
    fontSize: 26
  },
  text2: {
    top: 226.57,
    left: "8.1%",
    width: "71.62581256221866%",
    height: "8.774351414626206%",
    color: "#121212",
    position: "absolute",
    fontSize: 20
  },
  follow: {
    top: "60%",
    left: "8.1%",
    width: "71.62581256221866%",
    height: "8.774351414626206%",
    color: "#121212",
    position: "absolute",
    fontSize: 20
  },
  materialButtonViolet: {
    
    top: "11.33%",
    left: 243.82,
    width: "24.38%",
    height: "8.8%",
    position: "absolute"
  },
  text3: {
    top: 263.67,
    left: 29.24,
    width: "71.62581256221866%",
    height: "8.774351414626206%",
    color: "#121212",
    position: "absolute",
    fontSize: 20
  },
  statusBar: {},
  materialHeader1: {
    top: 0,
    left: 0,
    width: 361,
    height: 56,
    position: "absolute"
  },
  text4: {
    top: 133.21,
    left: 270.82,
    width: 56.21,
    height: 21.36,
    color: "#121212",
    position: "absolute",
    fontSize: 18
  }
});