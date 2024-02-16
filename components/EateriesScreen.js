import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {Marker} from "react-native-maps";
import {Image} from "react-native";
import places from "../assets/places.json";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import {FontAwesome} from "@expo/vector-icons";
import {Dropdown} from "react-native-material-dropdown";

const APIKEY = "";
const ORIGIN = {
    coords: {latitude: 1.29298990700923, longitude: 103.852542630339},
};
const OriginMarker = () => (
    <Image
        style={{width: 80, height: 80}}
        source={require("../assets/originmarker.png")}
    />
);
export function EateriesScreen() {
    Geocoder.init(APIKEY, {language: "en"});
    const [origin, setOrigin] = useState();
    const [originName, setOriginName] = useState(null);
    const [originPostalcode1d, setOriginPostalcode1d] = useState(null);
    const [sortedMarkers, setSortedMarkers] = useState([]);
    useEffect(() => {
        getLocation();
    }, []);
    useEffect(() => {
        const tempMarkers = [];
        Object.entries(places)
            .filter(([place, details]) => {
                const placePostalcode1d = details.address.formatted
                    .split("Singapore ")[1]
                    .match(/\d/)[0];
                return placePostalcode1d === originPostalcode1d;
            })
            .map(([place, details]) => {
                return {[place]: details};
            })
            .slice(0, 3)
            .forEach((marker, i) => {
                const place = Object.keys(marker)[0];
                const details = marker[place];

                getDistance(
                    `${ORIGIN["coords"]["longitude"]},${ORIGIN["coords"]["latitude"]};${details["address"]["coords"]["longitude"]},${details["address"]["coords"]["latitude"]}`
                ).then((res) => {
                    setSortedMarkers((prevValues) => [
                        ...prevValues,
                        {
                            [place]: {...details, distanceFromOrigin: res},
                        },
                    ]);
                    tempMarkers[i] = {
                        [place]: {...details, distanceFromOrigin: res},
                    };
                });
                setTimeout(() => {
                    tempMarkers.sort((a, b) => {
                        const detailsA = Object.values(a)[0];
                        const detailsB = Object.values(b)[0];
                        return (
                            detailsA.distanceFromOrigin -
                            detailsB.distanceFromOrigin
                        );
                    });
                    setSortedMarkers((prevValues) => [
                        ...prevValues,
                        ...tempMarkers,
                    ]);
                });
            }, 500);
    }, [originName]);

    const getLocation = () => {
        Location.getCurrentPositionAsync().then((res) => {
            console.log(JSON.stringify(res));

            setOrigin({
                coords: {
                    latitude: res["coords"]["latitude"],
                    longitude: res["coords"]["longitude"],
                },
            });
        });

        Geocoder.from({
            latitude: ORIGIN["coords"]["latitude"],
            longitude: ORIGIN["coords"]["longitude"],
        })
            .then((res) => {
                const name = res.results[0].formatted_address;
                setOriginPostalcode1d(
                    name.split("Singapore ")[1].match(/\d/)[0]
                );
                setOriginName(name);
            })
            .catch((error) => console.error(error));
    };

    const getDistance = (coords) => {
        // coords in form lng1,lat1;lng2,lat2
        // car, foot, bike
        const profile = "car";
        const options = {
            alternatives: false,
            steps: false,
            annotations: false,
            geometries: "polyline",
            overview: "simplified",
        };

        const params = new URLSearchParams(options);
        const url = `https://router.project-osrm.org/route/v1/${profile}/${coords}?${params}`;

        return fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                return res["routes"][0]["distance"];
            })
            .catch((error) => console.error(error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {origin ? (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: ORIGIN["coords"]["latitude"],
                            longitude: ORIGIN["coords"]["longitude"],
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {sortedMarkers.map((ele, i) => {
                            const [[place, details]] = Object.entries(ele);
                            console.log({[place]: details});
                            return (
                                <Marker
                                    key={i}
                                    coordinate={details["address"]["coords"]}
                                    title={place}
                                    description={
                                        details["address"]["formatted"]
                                    }
                                />
                            );
                        })}

                        <Marker
                            coordinate={{
                                latitude: ORIGIN["coords"]["latitude"],
                                longitude: ORIGIN["coords"]["longitude"],
                            }}
                            title="You are here"
                        >
                            <OriginMarker />
                        </Marker>
                    </MapView>
                ) : (
                    <Text>Loading...</Text>
                )}
                <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>Location:</Text>
                    <Text
                        style={styles.locationText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {originName || "Loading..."}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => handleFilterMarkers(filterType)}>
                <FontAwesome name="filter" size={24} color="black" />
            </TouchableOpacity>

            <Dropdown
                label="Filter by Type"
                data={filterOptions}
                onChangeText={(value) => {
                    if (value) {
                        handleFilterMarkers(value);
                    } else {
                        setFilteredMarkers(sortedMarkers); // Show all markers if no filter selected
                        setFilterType(null);
                    }
                }}
            />
            <View style={styles.recommendationContainer}>
                <Text style={styles.recommendationText}>
                    Recommendations Near You
                </Text>
            </View>
            <View style={styles.objectContainer}>
                {sortedMarkers ? (
                    sortedMarkers.slice(0, 2).map((ele, i) => {
                        const [[place, details]] = Object.entries(ele);
                        return (
                            <View style={styles.object} key={i}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={require("../assets/dish1.png")}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>{place}</Text>
                                    <Text style={styles.detailsText}>
                                        {(
                                            details["distanceFromOrigin"] / 1000
                                        ).toFixed(1)}
                                        {"km"}| {details["rating"]} 💬
                                    </Text>
                                    <Text style={styles.goalsText}>
                                        {details["goals"]},{" "}
                                        {details["dietary requirements"]}{" "}
                                        Options
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    mapContainer: {
        height: 400,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    locationContainer: {
        position: "absolute",
        backgroundColor: "white",
        padding: 5,
        margin: 10,
        borderRadius: 12,
        flexDirection: "row",
    },
    locationText: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
    },
    recommendationContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 12,
    },
    recommendationText: {
        fontSize: 16,
        fontWeight: "bold",
        borderRadius: 12,
    },
    objectContainer: {
        padding: 10,
    },
    object: {
        flexDirection: "row",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    imageContainer: {
        marginRight: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: "center",
        flex: 2,
    },
    nameText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "bold",
    },
    detailsText: {
        fontSize: 12,
        lineHeight: 24,
    },
    goalsText: {
        fontSize: 12,
        lineHeight: 24,
        color: "green",
    },
});
