import { StyleSheet, Text, View, TouchableOpacity,Image,Button} from 'react-native'
import React from 'react'
import{Link} from 'expo-router'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Home = () => {
  return (
    <View style={styles.container}>
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <FontAwesome5 name="seedling" size={40} color="pink"/>
      <Text style={styles.logo}>Planty</Text>
    </View>

   <View>
    <Text style={styles.up}>Bonjour, user!</Text>
    <Text style={styles.up}>Prêt pour une nouvelle analyse de vos champs ?</Text>
  </View>

  <View style={styles.box}>
    <Link href="/NouvelleDetection" asChild>
        <Button title="+ Nouvelle détection " color='pink'/>
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
      backgroundColor:'#f5f5dc',
      borderColor:'#006400',
      borderWidth: 20,
    },
    logo: {
      fontWeight: 'bold',
      fontSize: 32,
      marginBottom: 40,
      color: '#006400'
    },
    up: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      color: '#006400',
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
  