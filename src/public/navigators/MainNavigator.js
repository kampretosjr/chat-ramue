import React, { Component } from 'react';
import { createAppContainer,createStackNavigator ,createDrawerNavigator,createSwitchNavigator} from 'react-navigation';
import Home from '../../screens/home'
import leaderboard from '../../screens/leaderboard'
import login from '../../screens/login'
import Registerx from '../../screens/Registerx'
import sider from '../../screens/sideeffect'
import auth from '../../screens/auth'
import friendlist from '../../screens/friendlist'
import profile from '../../screens/profile'
import profileTeman from '../../screens/profileTeman'
import chat from '../../screens/chat'



const authLoading = createStackNavigator(
  {auth}
)
const AppNavigator = createStackNavigator(
  {
    
    register:{
      screen: Registerx,
      navigationOptions: () => ({
        header: null
      }),
    },
    login:{
      screen: login,
      navigationOptions: {
        header: null
      },
    },
    chat:{
      screen: chat,
      navigationOptions: () => ({
        header: null
      }),
    },
    
    leaderboard:{
      screen:leaderboard,
      navigationOptions:{
        title:"LEADER BOARD"
      }
    },
    profile:{
      screen: profile,
      navigationOptions: () => ({
        header: null
      }),
    },
    friendlist:{
      screen: friendlist,
      navigationOptions: () => ({
        header: null
      }),
    },
    
    home:{
      screen: Home,
      navigationOptions: () => ({
        header: null
      }),
    },
  }
)
const DrawerNavigator = createDrawerNavigator(
  {AppNavigator},
  {
    contentComponent: sider,
    drawerBackgroundColor: "rgba(255,255,255,1)", 
  })

  export default createAppContainer(createSwitchNavigator({
    DrawerNavigator,
    authLoading,
  }))

