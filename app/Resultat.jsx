
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useLocalSearchParams  } from 'expo-router';

const Resultat = () => {
  const { prediction, confidence } = useLocalSearchParams ();
  return (
    <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}>
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <FontAwesome5 name="seedling" size={40} color="pink" />
          <Text style={styles.logo}>Planty</Text>
        </View>

        <Text style={styles.title}>Résultat de l’analyse</Text>

        <View style={styles.resultBox}>


          <Text style={styles.resultText}>
            {prediction
              ? `Maladie détectée : ${prediction}\n`
              : 'Aucune maladie détectée\n'}
            {confidence
              ? `Accuracy : ${(parseFloat(confidence) * 100).toFixed(2)} %`
              : 'Accuracy : 100 %'}
          </Text>

        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enregistrer l’analyse</Text>
        </TouchableOpacity>

        <Link href="/NouvelleDetection" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>+ Nouvelle Détection</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🌱 Conseils</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    gap: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#388e3c',
    textAlign: 'center',
  },
  resultBox: {
    backgroundColor: '#f5f5dc',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#05822e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Resultat;
