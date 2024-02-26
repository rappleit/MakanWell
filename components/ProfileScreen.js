import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../colors';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { app } from "../firebase"

export function ProfileScreen({ route, navigation }) {

  const auth = getAuth(app);

  const selectedProfiles = route.params?.selectedProfiles ?? [];
  const isFocused = useIsFocused();
  const [dietProfile, setDietProfile] = useState([]);
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
    if(isFocused){
      retrieveProfile();
    }
    
  }, [isFocused])

  const handleLogout = () => {
    signOut(auth).then(()=>{
      navigation.navigate('HomeScreen')
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 20 }}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.mainCard}>
          <View style={styles.circleMask}>
            <Image
              style={styles.profileImg}
              source={require('../assets/profile.png')} />
          </View>

          <View>
            <Text style={styles.subtitle}>{(auth.currentUser) ? auth.currentUser.email: "UserABC"}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}><Text style={styles.linkLabel}>Edit Profile</Text></TouchableOpacity>
            {(auth.currentUser) ?
              <TouchableOpacity onPress={() => handleLogout()}><Text style={styles.linkLabel}>Logout</Text></TouchableOpacity>
              :
              <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.linkLabel}>Login/Sign Up</Text></TouchableOpacity>}


          </View>

        </View>
        <View style={{
          "display": "flex", "justifyContent": "space-between", "flexDirection": "row", "alignItems": "center", "marginVertical": 16, "width": "100%", "marginBottom": 24
        }}>

          <Text style={styles.subtitle2}>Diet Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditGoals')}><Text style={{ "color": "#fff", "fontSize": 16 }}>Edit</Text></TouchableOpacity>

        </View>
        <View style={styles.goalGrid}>
          {(dietProfile && dietProfile.length > 0) ?
            dietProfile.map((item, i) => (
              <View style={styles.goalCard} key={i}>
                <Image
                  style={styles.goalImg}
                  source={require('../assets/goal0.png')} />
                <Text style={styles.goalLabel}>{item.name}</Text>
              </View>
            ))
            : <></>}


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
    marginBottom: 20,
    justifyContent: "flex-start"
  }


})
