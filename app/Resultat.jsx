import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';

import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Resultat = () => {

  const handleSaveAnalysis = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Vous devez être connecté pour enregistrer l'analyse.");
        return;
      }

      const userHistRef = collection(db, 'users', user.uid, 'historiques');

      const analyseData = {
        typePlante: 'betterave sucrière',
        statut: 'sain',
        accuracy: 100,
        date: serverTimestamp(),
      };
      await addDoc(userHistRef, analyseData);

      Alert.alert('Succès', 'Analyse enregistrée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement :', error);
      Alert.alert('Erreur', 'Erreur lors de l\'enregistrement. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>LOGO</Text>
        <Text style={styles.title}>Résultat de l’analyse</Text>

        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Aucune maladie détectée{'\n'}Accuracy : 100%</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAnalysis}>
          <Text style={styles.buttonText}>Enregistrer l’analyse</Text>
        </TouchableOpacity>

        <Link href="/NouvelleDetection" asChild>
          <TouchableOpacity style={styles.newDetectionButton}>
            <Text style={styles.buttonText}>+ Nouvelle Détection</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.adviceButton}>
          <Text style={styles.buttonText}>🌿 Conseils</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    borderColor: '#006400',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#7bd198',
    width: '90%',
    height: '90%',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 30,
    gap: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginTop: 20,
  },
  resultBox: {
    backgroundColor: '#f5f5dc',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#05822e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  newDetectionButton: {
    backgroundColor: '#05822e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  adviceButton: {
    backgroundColor: '#05822e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Resultat;
