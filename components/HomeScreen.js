import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../colors';
import Icon from 'react-native-vector-icons/FontAwesome';


export function HomeScreen({navigation}) {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }} >
        <View style={styles.titleCard}>
          <Text style={styles.title}>Welcome Pacheco!</Text>
          <View style={styles.row}>
            <Text style={styles.goalTitle}>Your Goals</Text>
            <View style={styles.starsContainer}>
              <Text style={{fontWeight: "600"}}>37</Text>
              <Icon name={"star"} color={COLORS.secondary} size={18} />
            </View>
          </View>
          
          <View style={styles.goalCard}>
            <View style={styles.goalItem}>
            <Image
              style={{height: 36, objectFit: "contain"}}
              source={require('../assets/goal1.png')} />
              <Text style={styles.goalLabel}>Low Carb</Text>
            </View>
            <View style={styles.goalItem}>
            <Image
              style={{height: 36, objectFit: "contain"}}
              source={require('../assets/goal2.png')} />
              <Text style={styles.goalLabel}>Less Sodium</Text>
            </View>
            <View style={styles.goalItem}>
            <Image
              style={{height: 36, objectFit: "contain"}}
              source={require('../assets/goal3.png')} />
              <Text style={styles.goalLabel}>Less Sugar</Text>
            </View>
          </View>
        </View>
        <Text style={styles.title2}>My Dishes</Text>
        <View style={styles.dishContainer}>
          <View style={styles.dishCard}>
            <Image
              style={styles.dishImg}
              source={require('../assets/dish1.png')} />
            <View>
              <Text style={styles.dishName}>Saturday Cai Fan</Text>
              <Text style={styles.starsLabel}>1 Star Earned</Text>
              <Text style={styles.reccsLabel}>4 recommendations</Text>
              <Text style={styles.dateLabel}>14 Oct 2023</Text>
            </View>
          </View>
          <View style={styles.dishCard}>
            <Image
              style={styles.dishImg}
              source={require('../assets/dish1.png')} />
            <View>
              <Text style={styles.dishName}>Home Cooked Dinner</Text>
              <Text style={styles.starsLabel}>3 Stars Earned</Text>
              <Text style={styles.reccsLabel}>2 recommendations</Text>
              <Text style={styles.dateLabel}>14 Oct 2023</Text>
            </View>
          </View>
          
          <View style={styles.dishCard}>
            <Image
              style={styles.dishImg}
              source={require('../assets/dish1.png')} />
            <View>
              <Text style={styles.dishName}>Hackathon Dinner</Text>
              <Text style={styles.starsLabel}>1 Star Earned</Text>
              <Text style={styles.reccsLabel}>6 recommendations</Text>
              <Text style={styles.dateLabel}>14 Oct 2023</Text>
            </View>
          </View>
          <View style={styles.dishCard}>
            <Image
              style={styles.dishImg}
              source={require('../assets/dish1.png')} />
            <View>
              <Text style={styles.dishName}>Friday Rice Bowl</Text>
              <Text style={styles.starsLabel}>2 Stars Earned</Text>
              <Text style={styles.reccsLabel}>3 recommendations</Text>
              <Text style={styles.dateLabel}>14 Oct 2023</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDish')}>
        <Icon name={"camera"} color={"#FFF"} size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleCard: {
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 18,
    marginBottom: 18
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#ffffff",
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  starsContainer: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    width: 80,
    justifyContent: "center",
    gap: 8,
    borderRadius: 8

  },
  goalCard: {
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    marginVertical: 12,
    padding: 12,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 6
  },

  goalItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  goalLabel: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  dishContainer: {
    paddingHorizontal: 18,
    width: "100%",
    marginVertical: 16,
  },
  dishCard: {
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    padding: 12,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    marginBottom: 14
  },
  dishName: {
    fontWeight: "bold",
    fontSize: 18
  },
  reccsLabel: {
    fontWeight: "600",
    color: COLORS.primary
  },
  dateLabel: {
    fontStyle: "italic"
  },
  dishImg: {
    height: "100%",
    width: 100
  },
  addButton: {
    position: 'absolute',
    bottom: 20, 
    right: 20, 
    width: 64, 
    height: 64, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    zIndex: 8,
    backgroundColor: COLORS.secondary
  }

});