import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
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
    <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}
>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <FontAwesome5 name="seedling" size={40} color="pink" />
        <Text style={styles.logo}>Planty</Text>
      </View>

      <View>
        <Text style={styles.up}>Bonjour, {username} !</Text>
        <Text style={styles.up}>Prêt(e) pour une nouvelle analyse de vos champs ?</Text>
      </View>

      <View style={styles.box}>
        <Link href="/NouvelleDetection" asChild>
          <Button title="+ Nouvelle détection " color="pink" />
        </Link>
      </View>

     
    </LinearGradient>
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
  logo: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 40,
    color: '#006400',
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
});

