import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../colors';


const EditProfile = ({ navigation }) => {
    const nav = useNavigation();
    const [name, setName] = useState("")


    useEffect(() => {
        nav.setOptions({
            headerRight: () => <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                color={COLORS.primary}
                style={{ backgroundColor: 'none', marginRight: 14 }}>
                <Text style={{ "color": COLORS.primary, "fontSize": 16 }}>Save</Text>
            </TouchableOpacity>
        });
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'left', marginHorizontal: 20 }}>
                <View style={styles.editField}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter Name"
                    />
                </View>
                

            </ScrollView>
        </SafeAreaView>

    );
}

export default EditProfile;

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 18,
        alignSelf: "flex-start"
    },
    label: {
        fontSize: 18,
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical: 12,
        borderRadius: 4
    },
    editField: {
        marginBottom: 20
    }
})