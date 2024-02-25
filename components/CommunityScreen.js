import React, {useState} from "react";
import {StyleSheet, View, Text, Linking, TouchableOpacity} from "react-native";
import {Image} from "react-native";
import places from "../assets/places.json";
import Icon from "react-native-vector-icons/FontAwesome";
import {COLORS} from "../colors";
import CommunityPostModal from "./CommunityPostModal";

export function CommunityScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const linkToMaps = (details) => {
        const coordinates = `${Object.values(details["address"]["coords"])}`;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;

        Linking.openURL(googleMapsUrl);
    };
    return (
        <>
            <Text style={styles.title}>Community Sourced Recommendations</Text>
            {Object.entries(places)
                .slice(0, 3)
                .map(([place, details], i) => (
                    <View style={styles.postContainer} key={i}>
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
                            <Text style={styles.nameText}>{place}</Text>
                            <Text style={styles.description}>
                                Stupendous variety of healthy options!{" "}
                            </Text>
                            <Text style={styles.likes}>
                                💗{details["rating"]}
                            </Text>
                        </View>
                    </View>
                ))}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Icon name={"edit"} color={"#FFF"} size={24} />
            </TouchableOpacity>
            <CommunityPostModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
    },
    imageContainer: {
        flex: 1,
        marginRight: 16,
    },
    postContainer: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
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
    description: {
        fontSize: 12,
        lineHeight: 24,
    },
    likes: {
        textAlign: "right",
        fontSize: 12,
        lineHeight: 24,
    },
    linkMap: {
        color: "blue",
    },
    addButton: {
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
});
