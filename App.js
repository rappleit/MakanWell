import {StyleSheet, Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import {enableLatestRenderer} from "react-native-maps";

enableLatestRenderer();

export default function App() {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
