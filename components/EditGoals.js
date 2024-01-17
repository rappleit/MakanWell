import { ScrollView, View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';


const EditGoals = ({ route, navigation }) => {
    const [text, onChangeText] = useState("");
    const [goalStatus, setGoalStatus] = useState(false)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ "marginHorizontal": 24 }}>
                <View style={styles.header}>
                    <Text style={{ "fontWeight": "bold", "fontSize": 28 }}>Edit</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ProfileScreen', {
                            status: goalStatus
                        });
                    }} ><Text style={{ "fontWeight": "bold", "fontSize": 16, "color": COLORS.primary }}>Done</Text></TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Search"
                />
                <View>
                    <View style={styles.goalCard}>
                        <Text style={styles.goalName}>Low Carb</Text>
                        <Icon name={"check-circle"} color={"#fff"} size={24} />
                    </View>
                    <View style={styles.goalCard}>
                        <Text style={styles.goalName}>Less Sodium</Text>
                        <Icon name={"check-circle"} color={"#fff"} size={24} />
                    </View>
                    <View style={styles.goalCard}>
                        <Text style={styles.goalName}>Less Sugar</Text>
                        <Icon name={"check-circle"} color={"#fff"} size={24} />
                    </View>
                    <View style={styles.goalCard}>
                        <Text style={styles.goalName}>No Peanut</Text>
                        <Icon name={"check-circle"} color={"#fff"} size={24} />
                    </View>
                    {(goalStatus == false) ?
                        <TouchableOpacity onPress={() => setGoalStatus(true)}>
                            <View style={styles.nonGoalCard} >
                                <Text style={styles.nonGoalName}>More Protein</Text>
                            </View>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setGoalStatus(false)}>
                            <View style={styles.goalCard}>
                                <Text style={styles.goalName}>More Protein</Text>
                                <Icon name={"check-circle"} color={"#fff"} size={24} />
                            </View>
                        </TouchableOpacity>
                    }
                    <View style={styles.nonGoalCard}>
                        <Text style={styles.nonGoalName}>More Vitamin C</Text>
                    </View>
                    <View style={styles.nonGoalCard}>
                        <Text style={styles.nonGoalName}>More Fibre</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 28,
        alignItems: "center"
    },
    goalCard: {
        backgroundColor: COLORS.primary,
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12
    },
    goalName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
    nonGoalCard: {
        backgroundColor: "#fff",
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12
    },
    nonGoalName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        marginBottom: 28,
        borderWidth: 1,
        padding: 10,
    },
})

export default EditGoals;