import React from "react";
import {View, Text, Linking, StyleSheet} from "react-native";
import {Image} from "react-native";
import places from "../assets/places.json";

export function CommunityScreen() {
    const linkToMaps = (details) => {
        const coordinates = `${Object.values(details["address"]["coords"])}`;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;

        Linking.openURL(googleMapsUrl);
    };
    return (
        <>
            {Object.entries(places)
                .slice(0, 3)
                .map(([place, details], i) => (
                    <View style={styles.container} key={i}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("../assets/dish1.png")}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={styles.linkMap}
                                onPress={() => linkToMaps(details)}
                            >
                                View on Maps
                            </Text>
                            <Text style={styles.nameText}>
                                {place}💬{details["rating"]}
                            </Text>
                            <Text style={styles.addressText}>
                                {details["address"]["formatted"]}
                            </Text>
                        </View>
                    </View>
                ))}
        </>
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
        borderRadius: 12,
    },
    textContainer: {
        flex: 2,
        justifyContent: "center",
    },
    nameText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "bold",
    },
    addressText: {
        fontSize: 12,
        lineHeight: 24,
    },
    linkMap: {
        color: "blue",
    },
});
