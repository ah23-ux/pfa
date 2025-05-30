// app/(dashboard)/Historique.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

const Historique = () => {
  const [resultats, setResultats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, 'analyses'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResultats(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des analyses :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}>
      <Text style={styles.title}>Historique des Analyses</Text>
      <FlatList
        data={resultats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageURL }} style={styles.image} />
            <Text style={styles.result}>{item.resultat}</Text>
            <Text style={styles.date}>{new Date(item.date?.seconds * 1000).toLocaleString()}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default Historique;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#006400',
    textAlign: 'center',
  },
  card: {
    width: width - 40, // 👈 Toute la largeur de l'écran, moins les marges
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  result: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
