import React from "react";
import {View, Text} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {CommunityScreen} from "./CommunityScreen";
import {EateriesScreen} from "./EateriesScreen";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../colors";

export function DiscoverScreen() {
    const Tab = createMaterialTopTabNavigator();

    return (
        <SafeAreaView edges={["left", "right", "bottom"]} style={{flex: 1}}>
            <View
                style={{
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: 24,
                    paddingTop: 48,
                }}
            >
                <Text style={{fontSize: 28, fontWeight: "bold", color: "#fff"}}>
                    Discover
                </Text>
            </View>

            <NavigationContainer independent={true}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: {
                            fontSize: 12,
                            fontWeight: "bold",
                            color: "#fff",
                        },
                        tabBarItemStyle: {height: 60},
                        tabBarStyle: {backgroundColor: COLORS.primary},
                    }}
                >
                    <Tab.Screen name="Eateries" component={EateriesScreen} />
                    <Tab.Screen name="Community" component={CommunityScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
