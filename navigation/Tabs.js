import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {DiscoverScreen} from "../components/DiscoverScreen";
import {ProfileScreen} from "../components/ProfileScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import {COLORS} from "../colors";
import {HomeScreen} from "../components/HomeScreen";
import {createStackNavigator} from "@react-navigation/stack";
import AddDish from "../components/AddDish";
import FindIngredients from "../components/FindIngredients";
import DishAnalyser from "../components/DishAnalyser";
import EditGoals from "../components/EditGoals";
import RewardsScreen from "../components/RewardsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AddDish"
                component={AddDish}
                options={{
                    title: "Snap Your Meal",
                    tabBarStyle: {
                        display: "none",
                    },
                    tabBarButton: () => null,
                }}
            />
            <Stack.Screen
                name="FindIngredients"
                component={FindIngredients}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DishAnalyser"
                component={DishAnalyser}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}
function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="EditGoals"
                component={EditGoals}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarStyle: {height: 60},
                tabBarLabelStyle: {marginBottom: 6},
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Icon name={"home"} color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Icon name={"search"} color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Rewards"
                component={RewardsScreen}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Icon name={"star"} color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Icon name={"user"} color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
export default Tabs;
