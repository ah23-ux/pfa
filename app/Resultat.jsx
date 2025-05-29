import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';
import { useLocalSearchParams  } from 'expo-router';

const Resultat = () => {
  const { prediction, confidence } = useLocalSearchParams ();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>LOGO</Text>
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

        <TouchableOpacity style={styles.saveButton}>
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
        borderColor:'#006400',
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
      alignItems: 'center',
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
        marginTop:20,
      },
  resultBox: {
    backgroundColor: '#f5f5dc',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    marginTop:20,
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
    marginTop:20,
  },
  newDetectionButton: {
    backgroundColor: '#05822e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop:20,
  },
  adviceButton: {
    backgroundColor: '#05822e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomBar: {
    backgroundColor: '#f5f5dc',
    width: '90%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: '',
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 'auto', 
  },
  icon: {
    fontSize: 24,
  },
});

export default Resultat;