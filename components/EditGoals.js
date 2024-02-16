import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../colors";
import Icon from "react-native-vector-icons/FontAwesome";
import {useEffect, useState} from "react";

const profiles = {
    Goals: {
        Keto: "Low-carb, high-fat diet that can help you burn fat more effectively. It involves drastically reducing carbohydrate intake and replacing it with fat. This reduction in carbs puts your body into a metabolic state called ketosis. When this happens, your body becomes incredibly efficient at burning fat for energy.",
        Vegetarian:
            "Excludes meat, seafood, and poultry, but allows other foods. It can be effective for weight loss and certain health conditions.",
        "Low Carb":
            "Reduce the intake of carbohydrates to create a calorie deficit.",
        "Muscle Gain":
            "Involves eating more calories than the body burns, with a focus on protein. This diet should be combined with resistance or strength training exercises.",
    },
    "Dietary Requirements": {
        Halal: "Consumption of food that adheres to Islamic dietary laws.",
        "High Cholesterol":
            "Condition where there is too much cholesterol in your blood. Cholesterol is a type of fat that is essential for many bodily functions, but too much of it can stick to the walls of your arteries and narrow them, which can lead to heart disease.",
        Hypertension:
            "Also known as high blood pressure, is a condition where the force of the blood against the artery walls is too high. It can lead to severe health complications such as heart disease and stroke.",
        Hypoglycaemia:
            "Also known as Low blood sugar, is a condition resulting when the blood glucose levels drop below the specified limits (4 mmol/L or 72mg/dL). It causes irregular or rapid heartbeat, pale skin, numbness of lips, tongue or cheek, and sweating.",
        Bloating:
            "A feeling of tightness, pressure, or fullness in your belly, often caused by excess gas. It can make your stomach appear larger and clothes feel tighter. Bloating may be caused by how and what you eat, abnormal reactions to food, or certain medical conditions.",
        Obesity:
            "Obesity is a long-term health condition characterized by excess body fat, commonly measured by BMI.",
        "Iron Deficiency Anaemia":
            "Condition where a lack of iron in the body leads to a reduction in the number of red blood cells. Iron is used to produce red blood cells, which help store and carry oxygen in the blood.",
        "Irritable Bowel Syndrome (IBS)":
            "Common disorder that affects the stomach and intestines, also called the gastrointestinal tract. Symptoms include cramping, abdominal pain, bloating, gas, and diarrhea or constipation, or both.",
        "No Soy": "",
        "No Lactose": "",
        "No Gluten": "",
        "No Nuts": "",
        "No Seafood": "",
        "No Allium": "",
        "No Sesame": "",
    },
};

const EditGoals = ({route, navigation}) => {
    const [searchText, setSearchText] = useState("");
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const handleSearch = (text) => {
        setSearchText(text);
        setActiveFilter(null);
    };

    const createProfile = (profile, desc, selected) => {
        return (
            <TouchableOpacity
                key={profile}
                onPress={() =>
                    setSelectedProfiles(
                        selected
                            ? selectedProfiles.filter(
                                  (item) => item !== profile
                              )
                            : [...selectedProfiles, profile]
                    )
                }
            >
                <View
                    style={
                        selected ? styles.profileCard : styles.nonProfileCard
                    }
                >
                    <Text
                        style={
                            selected
                                ? styles.profileName
                                : styles.nonProfileName
                        }
                    >
                        {profile}
                        <TouchableOpacity
                            onPress={() =>
                                showDescriptionModal(
                                    <Text>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {profile}
                                        </Text>
                                        {"\n\n"}
                                        {desc}
                                    </Text>
                                )
                            }
                        >
                            <Icon
                                name="info-circle"
                                color={COLORS.secondary}
                                size={20}
                            />
                        </TouchableOpacity>
                    </Text>

                    <Icon name={"check-circle"} color={"#fff"} size={24} />
                </View>
            </TouchableOpacity>
        );
    };

    const showDescriptionModal = (desc) => {
        setSelectedDescription(desc);
        setModalVisible(!modalVisible);
    };

    const hideDescriptionModal = () => {
        setSelectedDescription("");
        setModalVisible(!modalVisible);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{marginHorizontal: 24}}>
                <View style={styles.header}>
                    <Text style={{fontWeight: "bold", fontSize: 28}}>Edit</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ProfileScreen", {
                                selectedProfiles: selectedProfiles,
                            });
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: COLORS.primary,
                            }}
                        >
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleSearch}
                    value={searchText}
                    placeholder="Search"
                />
                <View>
                    {searchText === "" ? (
                        <View>
                            <View style={styles.filterButtonsContainer}>
                                {Object.keys(profiles).map((profileType) => (
                                    <TouchableOpacity
                                        key={profileType}
                                        style={[
                                            styles.filterButton,
                                            activeFilter === profileType &&
                                                styles.activeFilterButton,
                                        ]}
                                        onPress={() => {
                                            activeFilter === profileType
                                                ? setActiveFilter(null)
                                                : setActiveFilter(profileType);
                                        }}
                                    >
                                        <Text style={styles.filterButtonText}>
                                            {profileType}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View>
                                {activeFilter === null
                                    ? Object.values(profiles).map(
                                          (profileType) =>
                                              Object.entries(profileType).map(
                                                  ([profile, desc]) =>
                                                      createProfile(
                                                          profile,
                                                          desc,
                                                          selectedProfiles.includes(
                                                              profile
                                                          )
                                                      )
                                              )
                                      )
                                    : Object.entries(profiles).map(
                                          ([profile, profileTypes]) => {
                                              if (profile === activeFilter) {
                                                  return Object.entries(
                                                      profileTypes
                                                  ).map(([profileType, desc]) =>
                                                      createProfile(
                                                          profileType,
                                                          desc,
                                                          selectedProfiles.includes(
                                                              profileType
                                                          )
                                                      )
                                                  );
                                              }
                                          }
                                      )}
                            </View>
                        </View>
                    ) : (
                        <View>
                            {Object.values(profiles).map((profileType) =>
                                Object.entries(profileType).map(
                                    ([profile, desc]) => {
                                        if (
                                            profile
                                                .toLowerCase()
                                                .includes(
                                                    searchText.toLowerCase()
                                                )
                                        ) {
                                            return createProfile(
                                                profile,
                                                desc,
                                                selectedProfiles.includes(
                                                    profile
                                                )
                                            );
                                        }
                                    }
                                )
                            )}
                        </View>
                    )}
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={hideDescriptionModal}
                    >
                        <TouchableWithoutFeedback
                            onPress={hideDescriptionModal}
                        >
                            <View style={styles.overlay} />
                        </TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>
                                {selectedDescription}
                            </Text>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={hideDescriptionModal}
                        >
                            <View style={styles.overlay} />
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 28,
        alignItems: "center",
    },
    input: {
        height: 40,
        marginBottom: 28,
        borderWidth: 1,
        padding: 10,
    },
    filterButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    filterButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    activeFilterButton: {
        backgroundColor: COLORS.secondary,
    },
    filterButtonText: {
        fontWeight: "bold",
    },
    profileCard: {
        backgroundColor: COLORS.primary,
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    nonProfileCard: {
        backgroundColor: "#fff",
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
    },
    nonProfileName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    overlay: {
        flex: 1,
    },

    modalContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default EditGoals;
