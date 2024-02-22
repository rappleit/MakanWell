import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {Marker} from "react-native-maps";
import {Image} from "react-native";
import p from "../assets/places.json";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import {FontAwesome} from "@expo/vector-icons";

const APIKEY = "";

function sortByDistance(a, b) {
    const detailsA = Object.values(a)[0];
    const detailsB = Object.values(b)[0];
    return detailsA.distanceFromOrigin - detailsB.distanceFromOrigin;
}
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

    const [filteredMarkers, setFilteredMarkers] = useState(sortedMarkers);
    const [filterTypes, setFilterTypes] = useState([]);
    const [showFilterOptions, setShowFilterOptions] = useState(false);

    const places = Object.entries(p).map(([place, details]) => {
        return {[place]: details};
    });

    useEffect(() => {
        Location.getCurrentPositionAsync().then((res) => {
            console.log(JSON.stringify(res));

            setOrigin({
                coords: {
                    latitude: res["coords"]["latitude"],
                    longitude: res["coords"]["longitude"],
                },
            });
            Geocoder.from({
                latitude: res["coords"]["latitude"],
                longitude: res["coords"]["longitude"],
            })
                .then((res) => {
                    const name = res.results[0].formatted_address;
                    setOriginPostalcode1d(
                        name.split("Singapore ")[1].match(/\d/)[0]
                    );
                    setOriginName(name);
                })
                .catch((error) => console.error(error));
        });
    }, []);

    useEffect(() => {
        places
            .filter((ele) => {
                const [[place, details]] = Object.entries(ele);
                const placePostalcode1d = details.address.formatted
                    .split("Singapore ")[1]
                    .match(/\d/)[0];
                return placePostalcode1d === originPostalcode1d;
            })
            .slice(0, 3)
            .forEach((marker) => {
                const place = Object.keys(marker)[0];
                const details = marker[place];

                getDistance(
                    `${origin["coords"]["longitude"]},${origin["coords"]["latitude"]};${details["address"]["coords"]["longitude"]},${details["address"]["coords"]["latitude"]}`
                ).then((res) => {
                    setSortedMarkers((prevValues) => [
                        ...prevValues,
                        {
                            [place]: {...details, distanceFromOrigin: res},
                        },
                    ]);
                });
            });
        setSortedMarkers(sortedMarkers.sort(sortByDistance));
    }, [originName]);

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

    const toggleFilterType = (type) => {
        if (filterTypes.includes(type)) {
            // Remove type if already selected
            setFilterTypes(filterTypes.filter((item) => item !== type));
            setFilteredMarkers(
                filteredMarkers.filter((ele) => {
                    const [[place, details]] = Object.entries(ele);
                    return details["type"] !== type;
                })
            );
        } else {
            // Add type if not already selected
            setFilterTypes([...filterTypes, type]);
            const nearestByPostalcodes = places
                .filter((ele) => {
                    const [[place, details]] = Object.entries(ele);
                    const placePostalcode1d = details.address.formatted
                        .split("Singapore ")[1]
                        .match(/\d/)[0];
                    return placePostalcode1d === originPostalcode1d;
                })

                .filter((details) => Object.values(details)[0][type] === type);
            const nearest =
                nearestByPostalcodes.length > 0 ? nearestByPostalcodes : places;
            nearest
                .filter((details) => Object.values(details)[0]["type"] === type)
                .slice(0, 3)
                .forEach((marker) => {
                    const place = Object.keys(marker)[0];
                    const details = marker[place];

                    getDistance(
                        `${origin["coords"]["longitude"]},${origin["coords"]["latitude"]};${details["address"]["coords"]["longitude"]},${details["address"]["coords"]["latitude"]}`
                    ).then((res) => {
                        setFilteredMarkers((prevValues) => [
                            ...prevValues,
                            {
                                [place]: {...details, distanceFromOrigin: res},
                            },
                        ]);
                    });
                });
            setFilteredMarkers(filteredMarkers.sort(sortByDistance));
        }
    };

    const renderFilterOptions = () => {
        const filterOptions = ["Hawker Centre", "Restaurant", "Cafe"];
        return (
            <View style={styles.filterOptionContainer}>
                {filterOptions.map((option, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => toggleFilterType(option.toLowerCase())}
                        style={styles.filterOption}
                    >
                        <FontAwesome
                            name={
                                filterTypes.includes(option.toLowerCase())
                                    ? "check-square"
                                    : "square-o"
                            }
                            size={24}
                            color="black"
                        />
                        <Text style={styles.filterOptionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderMarkers = () => {
        const markersToRender =
            filterTypes.length > 0 ? filteredMarkers : sortedMarkers;
        return markersToRender.map((ele, i) => {
            const [[place, details]] = Object.entries(ele);
            console.log({[place]: details});
            return (
                <Marker
                    key={i}
                    coordinate={details["address"]["coords"]}
                    title={place}
                    description={details["address"]["formatted"]}
                />
            );
        });
    };

    const renderMarkersPlaces = () => {
        const placesToRender =
            filterTypes.length > 0 ? filteredMarkers : sortedMarkers;
        return placesToRender.length > 0 ? (
            <ScrollView>
                {placesToRender.slice(0, 4).map((ele, i) => {
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
                                    {"km"} | {details["rating"]} 💬
                                </Text>
                                <Text style={styles.goalsText}>
                                    {details["goals"].join(", ")}
                                    {details["goals"].length > 0 ? ", " : ""}
                                    {details["dietary requirements"].join(
                                        ", "
                                    )}{" "}
                                    Options
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        ) : filterTypes.length > 0 ? (
            <Text>No Recommendations, try another filter?</Text>
        ) : (
            <Text>Loading...</Text>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {origin ? (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: origin["coords"]["latitude"],
                            longitude: origin["coords"]["longitude"],
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {renderMarkers()}

                        <Marker
                            coordinate={{
                                latitude: origin["coords"]["latitude"],
                                longitude: origin["coords"]["longitude"],
                            }}
                            title="You are here"
                        >
                            <OriginMarker />
                        </Marker>
                    </MapView>
                ) : (
                    <Text>Loading...</Text>
                )}
                <View>
                    <TouchableOpacity
                        style={styles.filterBtn}
                        onPress={() => setShowFilterOptions(!showFilterOptions)}
                    >
                        <FontAwesome name="filter" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.locationContainer}>
                        <Text
                            style={styles.locationText}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            Location: {originName || "Loading..."}
                        </Text>
                    </View>

                    {showFilterOptions && renderFilterOptions()}
                </View>
            </View>
            <View style={styles.recommendationContainer}>
                <Text style={styles.recommendationText}>
                    Recommendations Near You
                </Text>
            </View>
            <View style={styles.objectContainer}>{renderMarkersPlaces()}</View>
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
        right: 0,
        width: "85%",
    },
    locationText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    filterBtn: {
        padding: 5,
        margin: 10,
    },
    filterOptionContainer: {
        paddingLeft: 15,
    },
    filterOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    filterOptionText: {
        marginLeft: 5,
        fontSize: 16,
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
