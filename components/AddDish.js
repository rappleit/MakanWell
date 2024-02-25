import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera } from 'expo-camera';
import { COLORS } from '../colors';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';



const AddDish = ({ navigation }) => {

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result;

    // Check if camera permission is granted
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required to take a photo.');
      return;
    }

    result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      compressedImg = await manipulateAsync(
        result.assets[0].uri, [{resize: {width: 250}}],
        { compress: 1 }
      );
      setImage(compressedImg.uri);
    }
  };

  const pickFromLibrary = async () => {
    // No permissions request is necessary for launching the image library


    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,


      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      compressedImg = await manipulateAsync(
        result.assets[0].uri, [{resize: {width: 300}}],
        { compress: 1 }
      );
      setImage(compressedImg.uri);
    }
  };

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={pickImage} style={{ marginTop: 20, padding: 10, borderRadius: 10, backgroundColor: COLORS.primary }}>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickFromLibrary} style={{ marginTop: 20, padding: 10, borderRadius: 10, backgroundColor: COLORS.primary }}>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>Select from Library</Text>
        </TouchableOpacity>
        {(image) ? (
          <>
            <Image
              source={{ uri: image }}
              style={{ width: 300, objectFit: "contain", height: 300, marginTop: 20 }}
            />
            <TouchableOpacity onPress={() => {
              navigation.navigate('FindIngredients', {
                capturedImage: image
              });
            }} style={{ marginTop: 20, padding: 10, borderRadius: 10, backgroundColor: COLORS.primary }}>
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>Confirm</Text>
            </TouchableOpacity>
          </>


        ) : <></>}
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