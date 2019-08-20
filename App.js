import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Navigator from './src/public/navigators/MainNavigator'
import axios from 'axios';
import store from './src/public/redux/store'
import { Provider as StoreProvider } from 'react-redux'
import Splash from './src/screens/splash'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
      view: <Splash />
    }
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        view: <Navigator />
      })
    }, 500)
  }

  
  render() {
    // axios.defaults.headers.common["authorization"] = "wikwik"

    return (
    
      <StoreProvider store={store}>
        {this.state.view}
      </StoreProvider>
    )
  }
}
