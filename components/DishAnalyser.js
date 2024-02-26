import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../colors';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const DishAnalyser = ({ route, navigation }) => {
    const { capturedImage, foodList } = route.params;
    const [dietProfile, setDietProfile] = useState([])
    const [isChecking, setIsChecking] = useState(true)
    const retrieveProfile = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('diet-profile');
            const res = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(res)
            if (res !== null) {
                setDietProfile(res);
                console.log("SUCCESS")
            }
        } catch (e) {
            console.log("Error: " + e)
        }
    }
    useEffect(() => {
        retrieveProfile();
    }, [])
   

    const [res, setRes] = useState();
    const [recc, setRecc] = useState([]);

    useEffect(() => {
        if (dietProfile && dietProfile.length > 0) {
            analyseDish();

        }
    }, [dietProfile])

    const analyseDish = async () => {
        
        if (isChecking) {
        console.log("ANALYSING")
        const prompt1 = "The user is a person with the following diet profile: " +
            [dietProfile.map(item => item.name)].join(" ") +
            " They are logging in a meal that they have consumed which contains the following ingredients " +
            foodList +
            " Based on the user's diet goals and profile, and the ingredients in the meal they have consumed, suggest better substitutes to some of the listed ingredients " +
            "Your response must obey the following rules: " +
            "- Collapse your response in one line" +
            "- You do NOT need to suggest better substitutes for all the ingredients listed " +
            "- You MUST NOT suggest better substitutes for ingredients not listed " +
            "- When suggesting substitutes for a particular listed ingredient, the substitutes should cater to only one of the listed goals that is the most relevant" +
            "- Give an explanation to justify why one should try substituting that particular ingredient basedo n the most relevant goal"
        "- An example would be that one of the ingredients listed is White Rice. If the most relevant goal is Low Carb, the explanation is: 'White rice is high in carbs and sugar. You can replace white rice with:' and the suggested better substitutes may be '['Brown Rice', 'Quinoa', 'Cauliflower Rice']' " +
            "- Maximum 3 substitutes suggestions and maximum 2 sentences for explanation" +
            "- DO NOT HALLUCINATE " +
            "- No duplicate substitutes suggestions " +
            "- The reponse MUST be in JSON " +
            "- There must be 3 keys in each object in the array: ingredient, desc, and sub"
        "- Always place dietary restrictions on a higher priority like vegeterian, Halal, and allergies"

        try {

            const axiosResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                response_format: { "type": "json_object" },
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant, skilled in dietary health and nutrition." + "The response must strictly follow the format of the following sample response in JSON: " +
                        "{'list': [{'ingredient': 'White Rice', 'desc': 'White rice is high in carbs and sugar. You can replace white rice with:', 'sub': ['Brown Rice', 'Quinoa', 'Cauliflower Rice']}, {'ingredient': 'Sausage', 'desc': 'Sausage is a processed meat, which may be carcinogenic due to preservatives and tend to be high in sodium. You can replace sausage with:', 'sub': ['Lean Ground Meat', 'Legumes', 'Tofu']}]"
            
                    },
                    {
                        role: "user",
                        content: prompt1
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
                }
            }
            )
            console.log(axiosResponse.data.choices[0].message.content);
            setRes(axiosResponse.data.choices[0].message.content);
            setIsChecking(false);
        } catch (error) {
            setIsChecking(false);
            alert(error.message)
            
        }}

    }

    useEffect(()=>{
        if (res && res!="") {
            console.log(JSON.parse(res).list)
            setRecc(JSON.parse(res).list)
        }
    }, [res])

  

    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({
            headerRight: () => <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                color={COLORS.primary}
                style={{ backgroundColor: 'none', marginRight: 10 }}>
                <Text style={{ "color": COLORS.primary }}>Save</Text>
            </TouchableOpacity>
        });
    }, []);


    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
            <ScrollView>
                <Image
                    source={{ uri: capturedImage }}
                    style={styles.cameraPreview}
                />
                <View style={{ paddingHorizontal: 12 }}>


                    <Text style={styles.title}>Recommendations:</Text>
                    {(isChecking) ? <Text style={{ fontSize: 16 }}>Loading...</Text> : <></>}
                    {(recc && recc.length>0) ?
                        recc.map((item, i) => (
                            <View style={styles.ingredientCard} key={i}>
                                <Text style={styles.ingredientLabel}>{item.ingredient}</Text>
                                <Text>{item.desc}</Text>
                                {item.sub.map((s, j) => (
                                    <View style={styles.subCard} key={j}>
                                        <Text style={styles.subLabel}>{s}</Text>
                                    </View>
                                ))}
                            </View>
                        ))
                                : <></>}
                    


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

    achievementCard: {
        backgroundColor: COLORS.primary,
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        marginBottom: 16

    },
    achievementLabel: {
        fontWeight: "600",
        color: "#ffffff"
    },

    subCard: {
        backgroundColor: COLORS.primary,
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        marginBottom: 4

    },
    subLabel: {
        fontWeight: "600",
        color: "#ffffff",
        fontSize: 12
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

export default DishAnalyser;