import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const profil = () => {
  return(
    <View style={styles.container}>
       <Text style={styles.up}> Votre profile </Text>
      <View style={styles.info}> 
      <Pressable style={({pressed})=>[styles.btn,pressed && styles.pressed]}><Text style={{color:'black', fontFamily: 'monospace'}}>email</Text></Pressable>
      </View>
      <View style={styles.info}>
        <Pressable style={({pressed})=>[styles.btn,pressed && styles.pressed]}><Text style={{color:'black', fontFamily: 'monospace'}}>telephone</Text></Pressable>
      </View>
      <View style={styles.info}>
      <Pressable style={({pressed})=>[styles.btn,pressed && styles.pressed]}><Text style={{color:'black', fontFamily: 'monospace'}}>localisation</Text></Pressable>
      </View>
    </View>
  )
  
}

export default profil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'hsla(132, 94.90%, 30.80%, 0.75)',
  },
  up: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  btn:{
    backgroundColor:'#f4b700',
    padding: 15,
    borderRadius: 5,
  },
  pressed:{
    opacity:0.8
  }
})