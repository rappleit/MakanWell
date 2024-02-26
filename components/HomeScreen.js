import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useIsFocused, useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../colors";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
import { app } from "../firebase"


export function HomeScreen() {
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation();

    const [locPermission, setLocPermission] = useState(false);
    const [dietProfile, setDietProfile] = useState([])
    const auth = getAuth(app);
    const retrieveProfile = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('diet-profile');
            const res = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(res)
            if (res !== null) {
                setDietProfile(res);
                console.log("SUCCESS")
            }
        } catch (e) {
            console.log("Error: " + e)
        }
    }
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
          retrieveProfile();
        }
        
      }, [isFocused])

    const getLocationPermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message:
                            "Please allow Location Permission to use this feature...",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setLocPermission(true);
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };
    if (!locPermission) getLocationPermission();

    return (
        <SafeAreaView edges={["left", "right", "bottom"]} style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <View style={styles.titleCard}>
                    <Text style={styles.title}>Welcome!</Text>
                    <View style={styles.row}>
                        <Text style={styles.goalTitle}>Your Diet Profile</Text>
                        <View style={styles.starsContainer}>
                        <Icon
                                name={"star"}
                                color={COLORS.secondary}
                                size={18}
                            />
                            <Text style={{ fontWeight: "600" }}>Streak:</Text>
                            <Text>3</Text>
                        </View>
                    </View>

                    <View style={styles.goalCard}>
                        {(dietProfile && dietProfile.length > 3) ?
                            dietProfile.slice(0, 3).map((item, i) => (
                                <View style={styles.goalItem} key={i}>
                                    <Image
                                        style={{ height: 36, objectFit: "contain" }}
                                        source={require("../assets/goal0.png")}
                                    />
                                    <Text style={styles.goalLabel}>{item.name}</Text>
                                </View>
                            ))
                            : <></>}
                            {(dietProfile && dietProfile.length <= 3) ?
                            dietProfile.map((item, i) => (
                                <View style={styles.goalItem} key={i}>
                                    <Image
                                        style={{ height: 36, objectFit: "contain" }}
                                        source={require("../assets/goal0.png")}
                                    />
                                    <Text style={styles.goalLabel}>{item.name}</Text>
                                </View>
                            ))
                            : <></>}

                    </View>
                </View>

                <Text style={styles.title2}>My Food Journal</Text>
                {(auth.currentUser) ? <View style={styles.dishContainer}>
                    <View style={styles.dishCard}>
                        <Image
                            style={styles.dishImg}
                            source={require("../assets/dish1.png")}
                        />
                        <View>
                            <Text style={styles.dishName}>
                                Saturday Cai Fan
                            </Text>
                            <Text style={styles.starsLabel}>1 Star Earned</Text>
                            <Text style={styles.reccsLabel}>
                                4 recommendations
                            </Text>
                            <Text style={styles.dateLabel}>14 Oct 2023</Text>
                        </View>
                    </View>
                    <View style={styles.dishCard}>
                        <Image
                            style={styles.dishImg}
                            source={require("../assets/dish1.png")}
                        />
                        <View>
                            <Text style={styles.dishName}>
                                Home Cooked Dinner
                            </Text>
                            <Text style={styles.starsLabel}>
                                3 Stars Earned
                            </Text>
                            <Text style={styles.reccsLabel}>
                                2 recommendations
                            </Text>
                            <Text style={styles.dateLabel}>14 Oct 2023</Text>
                        </View>
                    </View>

                    <View style={styles.dishCard}>
                        <Image
                            style={styles.dishImg}
                            source={require("../assets/dish1.png")}
                        />
                        <View>
                            <Text style={styles.dishName}>
                                Hackathon Dinner
                            </Text>
                            <Text style={styles.starsLabel}>1 Star Earned</Text>
                            <Text style={styles.reccsLabel}>
                                6 recommendations
                            </Text>
                            <Text style={styles.dateLabel}>14 Oct 2023</Text>
                        </View>
                    </View>
                    <View style={styles.dishCard}>
                        <Image
                            style={styles.dishImg}
                            source={require("../assets/dish1.png")}
                        />
                        <View>
                            <Text style={styles.dishName}>
                                Friday Rice Bowl
                            </Text>
                            <Text style={styles.starsLabel}>
                                2 Stars Earned
                            </Text>
                            <Text style={styles.reccsLabel}>
                                3 recommendations
                            </Text>
                            <Text style={styles.dateLabel}>14 Oct 2023</Text>
                        </View>
                    </View>

                </View>:
                <View style={styles.noLoginContainer}>
                     <Icon
                     name="cutlery"
                                color="#aaa"
                                size={56}
                            />
                            <Text style={{fontSize: 18, fontWeight:  700, color: "#999"}}>Please log in to see your journal</Text>
                            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Profile", {screen: "Login"})}><Text style={{ "color": "#fff", "fontSize": 16, fontWeight: 600 }}>Log In</Text></TouchableOpacity>

                    </View>}
            </ScrollView>
            <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => navigation.navigate("AddDish")}
            >
                <Icon name={"camera"} color={"#FFF"} size={24} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleCard: {
        backgroundColor: COLORS.primary,
        width: "100%",
        paddingTop: 64,
        paddingHorizontal: 18,
    },
    tabs: {
        backgroundColor: COLORS.primary,
        width: "100%",
        marginBottom: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
    },
    title2: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 16
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    starsContainer: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,

        justifyContent: "center",
        gap: 8,
        borderRadius: 8,
    },
    goalCard: {
        backgroundColor: "#fff",
        width: "100%",
        alignSelf: "center",
        marginVertical: 12,
        padding: 12,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
        marginVertical: 6,
    },

    goalItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    goalLabel: {
        color: COLORS.primary,
        fontWeight: "600",
    },
    dishContainer: {
        paddingHorizontal: 18,
        width: "100%",
        marginVertical: 16,
    },
    dishCard: {
        backgroundColor: "#fff",
        width: "100%",
        alignSelf: "center",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        gap: 12,
        marginBottom: 14,
    },
    dishName: {
        fontWeight: "bold",
        fontSize: 18,
    },
    reccsLabel: {
        fontWeight: "600",
        color: COLORS.primary,
    },
    dateLabel: {
        fontStyle: "italic",
    },
    dishImg: {
        height: "100%",
        width: 100,
    },
    cameraButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        zIndex: 8,
        backgroundColor: COLORS.secondary,
    },
    noLoginContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 64
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        marginTop: 24,
        paddingVertical: 12,
        paddingHorizontal: 42,
        borderRadius: 8,
    }
});
