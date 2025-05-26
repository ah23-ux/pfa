import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const login = () => {
  return (
    <View>
      <Text>login</Text>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'hsla(132, 94.90%, 30.80%, 0.75)',
      },
      logo: {
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 40,
        color: 'white'
      },
})

