// app/(dashboard)/Historique.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'; //Importation des fonctions Firestore
import { LinearGradient } from 'expo-linear-gradient';

const Historique = () => {
    //Création de deux états locaux
  const [resultats, setResultats] = useState([]); //resultats contiendra la liste des analyses récupérées
  const [loading, setLoading] = useState(true);//loading indique si les données sont encore en cours de chargement

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser; //On récupère l’utilisateur connecté (auth.currentUser)
      if (!user) return;//S’il n’est pas connecté, on arrête 

      try {
        const q = query( //Crée une requête composée
          collection(db, 'analyses'), //Spécifie dans quelle collection Firestore tu veux chercher
          where('userId', '==', user.uid), //where('champ', 'opérateur', valeur),
          orderBy('date', 'desc')
        );

        const snapshot = await getDocs(q); //Exécute la requête et récupère les documents correspondants.
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResultats(data);//On met ces données dans resultats.
      } catch (error) {
        console.error("Erreur lors de la récupération des analyses :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) { // Si loading est true, on affiche un loader (ActivityIndicator) au centre de l’écran.
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  return (
     <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}
    >
      <Text style={styles.title}>Historique des Analyses</Text>
      <FlatList
        data={resultats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageURL }} style={styles.image} />
            <Text style={styles.result}>{item.resultat}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default Historique;

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
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
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
