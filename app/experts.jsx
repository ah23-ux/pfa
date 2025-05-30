import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function ExpertsList() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const expertsCol = collection(db, 'experts');
        const expertSnapshot = await getDocs(expertsCol);
        const expertsList = expertSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExperts(expertsList);
      } catch (error) {
        console.error('Erreur chargement experts:', error);
      }
    };

    fetchExperts();
  }, []);

  const callPhone = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Experts</Text>
      <FlatList
        data={experts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expertCard}>
            <Text style={styles.name}>{item.prenom} {item.nom}</Text>
            <Text>Plantes suivies: {item.plantes.join(', ')}</Text>
            <TouchableOpacity onPress={() => callPhone(item.phone)} style={styles.callButton}>
              <Text style={styles.callText}>Appeler: {item.phone}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, 
    paddingHorizontal: 20,
    paddingTop: 60, backgroundColor: '#f0fff0' },
  header: {
    height: 80,             // hauteur fixe pour header
    justifyContent: 'center',  // centre verticalement
    alignItems: 'center',      // centre horizontalement
    paddingTop: 20,            // un peu d’espace en haut
    backgroundColor: '#e6ffe6',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 15, color: '#006400' },
  expertCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  name: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 },
  callButton: { marginTop: 8, backgroundColor: '#32CD32', padding: 8, borderRadius: 5, alignItems: 'center' },
  callText: { color: '#fff', fontWeight: 'bold' },
});
