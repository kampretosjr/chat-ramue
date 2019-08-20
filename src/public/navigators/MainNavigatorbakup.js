import { createStackNavigator, createAppContainer ,  createDrawerNavigator,
    createMaterialTopTabNavigator
  } from "react-navigation";
  import { Platform, Dimensions } from "react-native";
import { Icon } from "native-base";

import Home from "../../screens/Home";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import DetailBook from "../../screens/DetailBook";
import AddBook from "../../screens/AddBook";
import Profile from "../../screens/Profile";

const AppNavigator = createStackNavigator({
    Home,
    Login,
    Register,
    DetailBook,
    AddBook,
    Profile,
},
{
    headerMode:'none',
    initialRouteName:'Home'
})

export default createAppContainer(AppNavigator)