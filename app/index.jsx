import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Link} from 'expo-router'
const index = () => {
  return ( <View>
    <Text>HOMe</Text>
    <Link href="/NouvelleDetection">Nouvelle Detection</Link>
    
  </View>
  );
}
const styles = StyleSheet.create({});
export default index;