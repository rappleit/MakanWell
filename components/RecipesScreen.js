import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native';

export function RecipesScreen() {

    return (
      <View style={{ width: "100%", display: "flex", alignItems: 'flex-start', justifyContent: "center", transform: "translateY(-290px)"}}>
      <Image
        style={{width: "120%", resizeMode: 'contain',} }
        source={require('../assets/RecipesScreen.png')} />
  </View>
    );
  }
  