import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <FontAwesome5 name="seedling" size={40} color="pink" />
        <Text style={styles.logo}>Planty</Text>
      </View>

      <View>
        <Text style={styles.up}>Bonjour, {username} !</Text>
        <Text style={styles.up}>Prêt pour une nouvelle analyse de vos champs ?</Text>
      </View>

      <View style={styles.box}>
        <Link href="/NouvelleDetection" asChild>
          <Button title="+ Nouvelle détection " color="pink" />
        </Link>
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="Se déconnecter" color="#006400" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5dc',
    borderColor: '#006400',
    borderWidth: 20,
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
