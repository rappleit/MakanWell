import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { COLORS } from '../colors';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { TextInput } from 'react-native-gesture-handler';



const FindIngredients = ({ route, navigation }) => {
    const { capturedImage } = route.params;
    const [foodList, setFoodList] = useState([])
    const [isChecking, setIsChecking] = useState(true)
    useEffect(() => {
        if (capturedImage) {

            uploadImage(capturedImage)
        }

    }, [capturedImage])

    const uploadImage = async (uri) => {
        if (isChecking) {
            let filename = uri.split('/').pop();
            const response = await fetch(uri);

            let formData = new FormData();
            formData.append('image', { uri, name: filename, type: 'image/jpeg' });
            try {
                const axiosResponse = await axios.post(
                    'https://vision.foodvisor.io/api/1.0/en/analysis',
                    formData,
                    {
                        headers: {
                            'Authorization': 'Api-Key ' + process.env.FOODVISOR_API_TOKEN,
                            "Content-Type": "multipart/form-data"
                        },
                    }
                );

                // Handle the response
                console.log(axiosResponse.data.items[0].food[0])
                setFoodList(axiosResponse.data.items.map((item) => item.food[0].food_info.display_name))
                setIsChecking(false);


            } catch (error) {
                alert(error.message)
                setIsChecking(false);

                
            }
        }
    };
    let [ShowComment, setShowModelComment] = useState(false);
    let [animateModal, setanimateModal] = useState(false);

    const [itemToAdd, setItemToAdd] = useState('');

    const handleChangeText = (text) => {
        setItemToAdd(text);
    };

    const handleAddItem = () => {
        if (itemToAdd != "") {
            setFoodList(prevItems => [...prevItems, itemToAdd])
            setItemToAdd("")
        }
    }

    return (
        <>
            <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={{ flex: 1 }}>
                <ScrollView>
                    <Image
                        source={{ uri: capturedImage }}
                        style={styles.cameraPreview}
                    />
                    <View style={{ paddingHorizontal: 12 }}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Ingredients Found: {foodList.length}</Text>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={{ color: COLORS.primary, fontWeight: "600", fontSize: 16 }} onPress={() => {
                                    setShowModelComment(true)
                                }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        {(isChecking) ? <Text style={{ fontSize: 16 }}>Loading...</Text> : <></>}
                        {foodList.map((food, i) => (
                            <View style={styles.ingredientCard} key={i}>
                                <Text style={styles.ingredientLabel}>{food}</Text>

                            </View>
                        ))}

                        <TouchableOpacity style={styles.confirmButton}  onPress={() => {
                                navigation.navigate('Your Meal Insights', {
                                    capturedImage: capturedImage,
                                    foodList: foodList
                                });
                            }}>
                            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <SwipeUpDownModal
                modalVisible={ShowComment}
                PressToanimate={animateModal}
                //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
                ContentModal={
                    <View style={styles.containerContent}>
                        <Text style={{ fontSize: 18, marginVertical: 14, fontWeight: 600 }}>Edit Ingredients</Text>
                        <View style={styles.addContainer}>
                            <TextInput
                                style={styles.inputIngredient}
                                placeholder="Enter item"
                                value={itemToAdd}
                                onChangeText={handleChangeText}
                            />
                            <TouchableOpacity style={styles.addButton} onPress={() => {
                                handleAddItem();
                            }} ><Text style={{ color: "#fff" }}>Add</Text></TouchableOpacity>
                        </View>

                        {foodList.map((food, i) => (
                            <View style={styles.ingredientCard2} key={i}>
                                <Text style={styles.ingredientLabel}>{food}</Text>
                                <TouchableOpacity onPress={() => {
                                    setFoodList(foodList.filter(i => i !== food))
                                }} ><Text style={{ "fontWeight": "bold", "fontSize": 12, "color": COLORS.primary }}>Delete</Text></TouchableOpacity>
                            </View>
                        ))}
                    </View>
                }
                HeaderStyle={styles.headerContent}
                ContentModalStyle={styles.Modal}
                HeaderContent={
                    <View style={styles.containerHeader}>

                    </View>
                }
                MainContainerModal={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                onClose={() => {
                    setShowModelComment(false);
                    setanimateModal(false);
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    cameraPreview: {
        width: "100%",
        height: 400,
        marginBottom: 24
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    addContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        height: 40,
        gap: 10,
        marginBottom: 16
    },
    addButton: {
        backgroundColor: COLORS.primary,
        height: "100%",
        borderRadius: 5,
        padding: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
    },
    inputIngredient: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 4,
        height: "100%",
        marginBottom: 10,
        flex: 1
    },
    ingredientCard: {
        backgroundColor: "#fff",
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"

    },
    ingredientCard2: {
        backgroundColor: "#ddd",
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"


    },
    ingredientLabel: {
        fontWeight: "600"
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 8,
        marginVertical: 12
    },
    editButton: {
        marginHorizontal: 8,
        fontSize: 10
    },
    containerContent: {
        flex: 1,
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 26,


    },
    containerHeader: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        backgroundColor: '#ddd',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30


    },
    headerContent: {
        marginTop: 200,
    },
    Modal: {
        backgroundColor: '#fff',
        marginTop: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30


    }

})

export default FindIngredients;