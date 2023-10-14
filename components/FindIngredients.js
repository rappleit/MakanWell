import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

const FindIngredients = ({ route, navigation }) => {
    const { capturedImage } = route.params;
    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
            <ScrollView>
                <Image
                    source={{ uri: capturedImage.uri }}
                    style={styles.cameraPreview}
                />
                <View style={{ paddingHorizontal: 12 }}>
                    <Text style={styles.title}>Ingredients Found</Text>
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
    }
})

export default FindIngredients;