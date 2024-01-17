import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native';

export function EateriesScreen() {
  const Tab = createMaterialTopTabNavigator();

    return (
      <View style={{ width: "100%", display: "flex", alignItems: 'flex-start', justifyContent: "center", transform: "translateY(-160px)"}}>
            <Image
              style={{width: "100%", resizeMode: 'contain',} }
              source={require('../assets/EateriesScreen.png')} />
        </View>
    );
  }
  