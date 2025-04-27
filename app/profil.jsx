import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import{Link} from 'expo-router'

const About = () => {
  return (
    <View>
      <Text>about Page</Text>
      <Link href="/">Home page</Link>
    </View>
  )
}

export default About

const styles = StyleSheet.create({})