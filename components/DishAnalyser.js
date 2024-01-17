import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../colors';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";


const DishAnalyser = ({ route, navigation }) => {
    const { capturedImage, foodList } = route.params;
    const reccs = {
        "White rice": {
            "desc": "White rice is high in carbs and sugar. You can replace white rice with:",
            "sub": ["Brown Rice", "Quinoa", "Cauliflower Rice", "Konjac Rice"]
        },
        "Sausage": {
            "desc": "Sausage is a processed meat, which may be carcinogenic due to preservatives and tend to be high in sodium. You can replace sausage with:",
            "sub": ["Lean Ground Meat", "Mushroom", "Legumes", "Tofu"]
        },
        "French fries": {
            "desc": "French fries are often deep-fried and high in unhealthy fats and carbohydrates. You can replace French fries with:",
            "sub": ["Turnip Fries", "Zucchini Fries", "Carrot Fries", "Eggplant Fries"]
        },
        "White beans": {
            "desc": "Canned baked beans often contain added sugars and high sodium levels. For a healthier option, consider replacing processed beans with:",
            "sub": ["Lentils", "Chickpeas", "Lentil Pasta", "Edamame", "Peas"]
        }
    }

    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({
            headerRight: () => <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen')}
            color= {COLORS.primary}
            style={{ backgroundColor: 'none', marginRight: 10 }}>
            <Text style={{"colour": COLORS.primary}}>Save</Text>
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
                    <Text style={styles.title}>Achievements:</Text>
                    <View style={styles.achievementCard}>
                        <Text style={styles.achievementLabel}>High in protein</Text>
                    </View>

                    <Text style={styles.title}>Recommendations:</Text>
                    {foodList.map((food, i) => ((Object.keys(reccs).includes(food)) ?
                        <View style={styles.ingredientCard} key={i}>
                            <Text style={styles.ingredientLabel}>{food}</Text>
                            <Text>{reccs[food].desc}</Text>
                            {reccs[food].sub.map((s, i) => (
                                <View style={styles.subCard}>
                                    <Text style={styles.subLabel}>{s}</Text>
                                </View>
                            ))}
                        </View> : <></>
                    ))}


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