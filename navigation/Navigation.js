import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../containers/Login'
import Application from "./ApplicationNavigation";

const Stack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login'
        }
    },
    Application: {
        screen: Application,
        navigationOptions: {
            title: 'Application'
        }
    },
},
{
    initialRouteName: 'Login'
});

export default createAppContainer(Stack);