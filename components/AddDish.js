import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera } from 'expo-camera';
import { COLORS } from '../colors';


const AddDish = ({ navigation }) => {
    const [startCamera, setStartCamera] = React.useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }
    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
      }

    useEffect(() => {
        __startCamera()
    }, [])
    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1, alignItems: 'center', }}>
            <View style={styles.screen}>
                {previewVisible && capturedImage ? (
                    <View style={styles.previewContainer}>
                        <Image
                            source={{ uri: capturedImage.uri }}
                            style={styles.cameraPreview}
                        />
                        <TouchableOpacity onPress={() => {
          navigation.navigate('FindIngredients', {
            capturedImage: capturedImage,
          });
        }}style={styles.confirmButton}>
                            <Text style={{color: "#fff", fontWeight: "600", fontSize: 18}}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={__retakePicture} style={styles.retakeButton}>
                            <Text style={{fontWeight: "600", fontSize: 18}}>Retake</Text>
                        </TouchableOpacity>
                    </View>

                ) : (
                    <Camera
                        style={styles.camera}
                        ref={(r) => {
                            camera = r
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                backgroundColor: 'transparent',
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    flexDirection: 'row',
                                    flex: 1,
                                    width: '100%',
                                    padding: 20,
                                    justifyContent: 'space-between'
                                }}
                            >
                                <View
                                    style={{
                                        alignSelf: 'center',
                                        flex: 1,
                                        alignItems: 'center'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={__takePicture}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            bottom: 0,
                                            borderRadius: 50,
                                            backgroundColor: '#fff',
                                            borderColor: COLORS.primary,
                                            borderWidth: 6
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Camera>
                )}
            </View>

        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    screen: {
        width: "100%"
    },
    camera: {
        width: "100%",
        height: "100%",
    },
    cameraPreview: {
        width: "100%",
        height: 400,
        marginBottom: 24
    },
    previewContainer: {
        display: "flex",
        alignItems: "center"
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        width: "80%",
        display: "flex",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 24
    },
    retakeButton: {
        backgroundColor: "#fff",
        width: "80%",
        display: "flex",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 8,
        
    }
})
export default AddDish;