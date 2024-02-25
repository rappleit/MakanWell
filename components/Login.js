import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../colors';
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "../firebase"


const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.navigate('ProfileScreen')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                alert('Error ' + errorCode, errorMessage, [
                    {text: 'OK', onPress: () => console.log('Rip')},
                  ]);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 20 }}>
            <View style={styles.banner}>

                <View style={styles.bannerCard}>
                    <Icon name={"book"} color="#fff" size={24} />
                    <Text style={styles.bannerLabel}>Save your dishes to a food journal</Text>
                </View>
                <View style={styles.bannerCard}>
                    <Icon name={"trophy"} color="#fff" size={24} />

                    <Text style={styles.bannerLabel}>Track your daily journal streak</Text>
                </View>
                <View style={styles.bannerCard}>
                    <Icon name={"group"} color="#fff" size={24} />

                    <Text style={styles.bannerLabel}>Contribute to the community</Text>
                </View>

            </View>
            <Text style={styles.title}>Login</Text>

            <View style={styles.fields}>
                <View style={styles.editField}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Enter Email"
                    />
                </View>
                <View style={styles.editField}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}><Text style={styles.buttonLabel}>Login</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{ fontSize: 16, textAlign: "center", marginTop: 12, color: COLORS.primary }}>Don't have an account? Sign up here!</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}><Text style={{ fontSize: 16, textAlign: "center", marginTop: 12, color: COLORS.primary }}>Back</Text></TouchableOpacity>

            </View>


        </SafeAreaView>

    );
}

export default Login;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    banner: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        marginBottom: 32,
        marginTop: 36
    },
    bannerCard: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        display: "flex",
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    bannerLabel: {
        fontSize: 16
    },
    fields: {
        marginVertical: 16,
        width: "100%",

    },
    editField: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
        width: "100%",

    },
    label: {
        fontSize: 18
    },
    input: {
        fontSize: 18,
        backgroundColor: "#fff",
        paddingVertical: 12,
        width: "80%",
        paddingHorizontal: 12
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        width: "80%",
        alignSelf: "center",
        padding: 10,
        marginTop: 12
    },
    buttonLabel: {
        fontSize: 18,
        textAlign: "center"
    }
})