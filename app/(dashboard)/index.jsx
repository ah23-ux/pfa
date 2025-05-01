import { StyleSheet, Text, View, TouchableOpacity,Image,Button} from 'react-native'
import React from 'react'
import{Link} from 'expo-router'
import Icon from 'react-native-vector-icons/Feather';

const Home = () => {
  return (
    <View style={styles.container}>
  <Text style={styles.logo}>Planty</Text>
  <View>
    <Text style={styles.up}>Bonjour, user!</Text>
    <Text style={styles.up}>Prêt pour une nouvelle analyse de vos champs ?</Text>
  </View>

  <View style={styles.box}>
    <Link href="/NouvelleDetection" asChild>
        <Button title="+ Nouvelle détection " color='#006400'/>
    </Link>
  </View>

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
     
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
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
    },
    bottomBar: {
        backgroundColor: '#f5f5dc',
        width: '90%',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: '',
        paddingVertical: 10,
        marginTop: 20
        
      },
      icon: {
        fontSize: 24,
      }
  });
  