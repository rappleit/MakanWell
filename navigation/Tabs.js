import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../components/HomeScreen";
import { DiscoverScreen } from "../components/DiscoverScreen";
import { ProfileScreen } from "../components/ProfileScreen";
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarStyle: { height: 60 }, tabBarLabelStyle:{marginBottom: 6}}}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({size, color}) => (<Icon name={"home"} color={color} size={size} />)
                }}/>
            <Tab.Screen name="Discover" component={DiscoverScreen} options={{
                    tabBarIcon: ({size, color}) => (<Icon name={"map"} color={color} size={size} />)
                }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({size, color}) => (<Icon name={"user"} color={color} size={size} />)
                }}/>

        </Tab.Navigator>
    )
}
export default Tabs