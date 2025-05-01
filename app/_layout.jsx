import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'

const RootLayout = () => {
  return (

      <Stack screenOptions={{
        headerStyle: '#f5f5dc',
        headerTintColor: '#05822e'
      }}>
        <Stack.Screen name='index' options={{title: 'Home' ,headerShown: false}} />
        <Stack.Screen name='NouvelleDetection' options={{title: 'Nouvelle Détection' ,headerShown: true,
           headerStyle: {
            backgroundColor: '#f5f5dc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}
        }} />
        <Stack.Screen name='profil' options={{title: 'Profil' ,headerShown: false}} />
        <Stack.Screen name='Historique' options={{title: 'Historique' ,headerShown: false}} />
        <Stack.Screen name='Resultat' options={{title: 'Resultat' ,headerShown: true,
           headerStyle: {
            backgroundColor: '#f5f5dc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}
        }} />
        <Stack.Screen name='loading' options={{title: 'Loading' ,headerShown: false}} />
        <Stack.Screen name='(dashboard)' options={{headerShown: false}} />
      </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})