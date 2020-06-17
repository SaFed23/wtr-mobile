import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './containers/Login'
import Application from "./components/ApplicationView";


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
            title: 'Reports'
        }
    },
    // ImagesGrid: {
    //     screen: GridScreen,
    //     navigationOptions: ({ navigation }) => {
    //         return {
    //             title: navigation.state.params.title
    //         };
    //     }
    // }
},
{
    initialRouteName: 'Login'
});

export default createAppContainer(Stack);