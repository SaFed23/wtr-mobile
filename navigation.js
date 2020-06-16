import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './containers/Login'


const Stack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login'
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