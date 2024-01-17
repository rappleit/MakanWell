import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { LOGMEAL_API_TOKEN } from '@env'
import * as FileSystem from 'expo-file-system';
import { COLORS } from '../colors';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';



const FindIngredients = ({ route, navigation }) => {
    const { capturedImage } = route.params;
    const [foodList, setFoodList] = useState([])
    useEffect(() => {
        if (capturedImage) {

            uploadImage(capturedImage)
        }

    }, [capturedImage])

    const uploadImage = async (uri) => {
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
                        'Authorization': 'Api-Key GOLvji0I.AsXqtiZhyzCqJTpe9OmOF2RPWrGumj1O',
                        "Content-Type": "multipart/form-data"
                    },
                }
            );

            // Handle the response
            console.log(axiosResponse.data.items[0].food[0])
            setFoodList(axiosResponse.data.items.map((item) => item.food[0].food_info.display_name))
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    };


    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
            <ScrollView>
                <Image
                    source={{ uri: capturedImage }}
                    style={styles.cameraPreview}
                />
                <View style={{ paddingHorizontal: 12 }}>
                    <Text style={styles.title}>Ingredients Found: {foodList.length}</Text>
                    {foodList.map((food, i) => (
                        <View style={styles.ingredientCard} key={i}>
                            <Text style={styles.ingredientLabel}>{food}</Text>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.confirmButton}>
                        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }} onPress={() => {
                            navigation.navigate('DishAnalyser', {
                                capturedImage: capturedImage,
                                foodList: foodList
                            });
                        }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </SafeAreaView>

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
    ingredientCard: {
        backgroundColor: "#fff",
        padding: 12,
        marginVertical: 6,
        borderRadius: 8

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
})

export default FindIngredients;