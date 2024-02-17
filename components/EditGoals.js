import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../colors";
import Icon from "react-native-vector-icons/FontAwesome";
import {useState} from "react";
import profiles from "../assets/profiles.json";

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

    const createProfile = (i, profile, desc, selected) => {
        return (
            <TouchableOpacity
                key={i}
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
                                                  ([profile, desc], i) =>
                                                      createProfile(
                                                          i,
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
                                                  ).map(
                                                      (
                                                          [profileType, desc],
                                                          i
                                                      ) =>
                                                          createProfile(
                                                              i,
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
                                    ([profile, desc], i) => {
                                        if (
                                            profile
                                                .toLowerCase()
                                                .includes(
                                                    searchText.toLowerCase()
                                                )
                                        ) {
                                            return createProfile(
                                                i,
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
