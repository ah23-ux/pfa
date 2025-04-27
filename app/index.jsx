import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import Logo from '../assets/profil.png'
import{Link} from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
  <Text style={styles.logo}>Planty</Text>
  <View>
    <Text style={styles.up}>Bonjour, user!</Text>
    <Text style={styles.up}>Prêt pour une nouvelle analyse de vos champs ?</Text>
  </View>

  <View style={styles.box}>
    <Text style={{ fontWeight: 'bold', fontFamily: 'monospace', color: 'white' }}>
      + Nouvelle détection
    </Text>
  </View>

  <View style={styles.box}>
    <Text style={{ fontWeight: 'bold', fontFamily: 'monospace', color: 'white' }}>
      Historique des analyses
    </Text>
  </View>

  <Link href="/profil"  style={styles.icons}><Image source={Logo} style={styles.img}/> </Link>
</View>

  )
}

export default Home

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
    up: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
      marginBottom: 10,
    },
    box: {
      width: '80%',
      padding: 20,
      backgroundColor: '#006400',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      marginVertical: 10,
      shadowColor: '#004d00',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5, 
    },
    link: {
      marginTop: 40,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      color: 'white',
      fontSize: 16,
      paddingVertical: 10,
    },
    img:{
        width: 50,       // largeur de l'icône
        height: 50,      // hauteur de l'icône
        borderRadius: 25, // moitié de width/height pour avoir un cercle parfait
        borderWidth: 2,
        borderColor: 'white',
    },
    icons:{
        marginTop: 60
    }
  });
  