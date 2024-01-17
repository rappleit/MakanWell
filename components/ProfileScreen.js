import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../colors';
import { TouchableOpacity } from 'react-native';


export function ProfileScreen({ route, navigation }) {

  const goalStatus = route.params?.status ?? false

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 20 }}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.mainCard}>
          <View style={styles.circleMask}>
            <Image
              style={styles.profileImg}
              source={require('../assets/profile.jpg')} />
          </View>

          <View>
            <Text style={styles.subtitle}>Joshua Pacheco</Text>
            <Text style={styles.starLabel}>37 ⭐</Text>
            <Text style={styles.linkLabel}>Edit Profile</Text>
          </View>

        </View>
        <View style={{
          "display": "flex", "justifyContent": "space-between", "flexDirection": "row", "alignItems": "center", "marginVertical": 16, "width": "100%", "marginBottom": 24
        }}>

          <Text style={styles.subtitle2}>Goals and Diet</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditGoals')}><Text style={{ "color": "#fff", "fontSize": 16 }}>Edit</Text></TouchableOpacity>

        </View>
        <View style={styles.goalGrid}>
          <View style={styles.goalCard}>
            <Image
              style={styles.goalImg}
              source={require('../assets/goal1.png')} />
            <Text style={styles.goalLabel}>Low Carb</Text>
          </View>
          <View style={styles.goalCard}>
            <Image
              style={styles.goalImg}
              source={require('../assets/goal2.png')} />
            <Text style={styles.goalLabel}>Less Sodium</Text>
          </View>
          <View style={styles.goalCard}>
            <Image
              style={styles.goalImg}
              source={require('../assets/goal3.png')} />
            <Text style={styles.goalLabel}>Less Sugar</Text>
          </View>
          <View style={styles.goalCard}>
            <Image
              style={styles.goalImg}
              source={require('../assets/goal4.png')} />
            <Text style={styles.goalLabel}>No Peanut</Text>
          </View>
          {(goalStatus) ? <View style={styles.goalCard}>
            <Image
              style={styles.goalImg}
              source={require('../assets/goal5.png')} />
            <Text style={styles.goalLabel}>More Protein</Text>
          </View> : <></>}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 18,
    alignSelf: "flex-start"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle2: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  starLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12

  },
  linkLabel: {
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: 8
  },
  mainCard: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  circleMask: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    backgroundColor: COLORS.primary,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: 4,
    borderRadius: 8
  },
  goalCard: {
    backgroundColor: "#fff",
    width: 160,
    height: 160,
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    gap: 12,

  },
  goalLabel: {
    fontWeight: "bold",
    fontSize: 16
  },
  goalImg: {
    height: 60,
    objectFit: "contain"
  },
  goalGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 20
  }
  

})