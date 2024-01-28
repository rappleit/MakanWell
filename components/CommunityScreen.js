import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Image} from "react-native";

export function CommunityScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/dish1.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.postText}>
                    Amazing dish, 10/10. Would recc the Turnip Spread
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    imageContainer: {
        flex: 1,
        marginRight: 16,
    },
    image: {
        width: "100%",
        height: 100,
        borderRadius: 8,
    },
    textContainer: {
        flex: 2,
        justifyContent: "center",
    },
    postText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
