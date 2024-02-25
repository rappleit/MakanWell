import React, {useState} from "react";
import {Modal, TouchableOpacity, View, Text, TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // assuming you're using FontAwesome for icons
import {COLORS} from "../colors";

const CommunityPostModal = ({visible, onClose}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);

    const handleSubmit = () => {
        console.log("Form submitted:", {name, description, tags});
        setShowThankYouMessage(true);
        setTimeout(() => {
            setShowThankYouMessage(false);
            onClose();
        }, 2000);
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>
                    {showThankYouMessage ? (
                        <Text style={styles.thankYouMessage}>
                            Thank you! Your contribution is being processed
                        </Text>
                    ) : (
                        <View>
                            {/* Image picker */}
                            <TouchableOpacity style={styles.imagePickerButton}>
                                {/* Placeholder for image picker */}
                            </TouchableOpacity>
                            {/* Name input */}
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                            />
                            {/* Description input */}
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                            />
                            {/* Tags input */}
                            <TextInput
                                style={styles.input}
                                placeholder="Tags"
                                value={tags}
                                onChangeText={setTags}
                            />
                            {/* Button to select from Google Maps */}
                            <TouchableOpacity style={styles.googleMapsButton}>
                                <Text style={styles.googleMapsButtonText}>
                                    Select from Google Maps
                                </Text>
                            </TouchableOpacity>
                            {/* Submit button */}
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.submitButtonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default CommunityPostModal;

const styles = {
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        height: "100%",
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    imagePickerButton: {
        // Styles for image picker button
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    googleMapsButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    },
    googleMapsButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    submitButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    },
    submitButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    thankYouMessage: {
        textAlign: "center",
        marginTop: 10,
        color: "black",
    },
};
