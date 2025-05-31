import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';




const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.replace('/(auth)/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || 'Utilisateur');
        }
      } catch (error) {
        console.error('Erreur Firestore :', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  return (
    <ImageBackground
    source={require('../../assets/homepage.jpg')} 
    style={styles.background}
    resizeMode="cover"
  >
    <LinearGradient
    colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']}
    style={StyleSheet.absoluteFill}
  />
   
 
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <FontAwesome5 name="seedling" size={40} color="pink" />
        <Text style={styles.logo}>Planty</Text>
      </View>

      <View>
        <Text style={styles.up}>Bonjour, {username} !</Text>
        <Text style={styles.up}>Prêt(e) pour une nouvelle analyse de vos champs ?</Text>
      </View>

      <View style={styles.box}>
        <Link href="/categorie" asChild>
          <Button title="+ Nouvelle détection " color="green" />
        </Link>
      </View>
      <View style={styles.box}>
        <Link href="/experts" asChild>
          <Button title="Liste des experts" color="#006400" />
        </Link>
      </View>
     
      </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#e8f5e9', // un vert très pâle
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  up: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 40,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  
});

