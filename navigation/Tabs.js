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
import EditProfile from "../components/EditProfile";
import Login from "../components/Login";
import Signup from "../components/Signup";
import {CommunityScreen} from "../components/CommunityScreen";

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
                name="Your Meal Insights"
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
            <Stack.Screen
                name="Edit Profile"
                component={EditProfile}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
function CommunityStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CommunityScreen"
                component={CommunityScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CommunityPost"
                component={CommunityPost}
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
                tabBarStyle: { height: 75 },
                tabBarLabelStyle: { marginBottom: 6 }
            }}>
            <Tab.Screen name="Home" component={HomeStackNavigator} options={{
                tabBarIcon: ({ size, color }) => (<Icon name={"home"} color={color} size={size} />)
            }} />
            <Tab.Screen name="Discover" component={DiscoverScreen} options={{
                tabBarIcon: ({ size, color }) => (<Icon name={"search"} color={color} size={size} />)
            }} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{
                tabBarIcon: ({ size, color }) => (<Icon name={"user"} color={color} size={size} />)
            }} />

        </Tab.Navigator>
    );
};
export default Tabs;
