import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGO</Text>
      <Text style={styles.hello}>Hello, user</Text>
      <Text style={styles.subtitle}>Prêt pour une nouvelle analyse de vos champs ?</Text>

      <TouchableOpacity style={styles.newDetectionButton}>
        <Text style={styles.buttonText}>+ Nouvelle Détection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyText}>Historique des analyses</Text>
      </TouchableOpacity>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Conseil du Jour :</Text>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>Il faut drop out for a better life</Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.icon}>👤</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ED957', // Vert clair
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  hello: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  newDetectionButton: {
    backgroundColor: '#006400', // Vert foncé
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#A9F5A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  historyText: {
    color: 'black',
    fontWeight: 'bold',
  },
  tipContainer: {
    backgroundColor: '#F0F0C9',
    padding: 15,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipBox: {
    backgroundColor: '#FFFF99',
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  tipText: {
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 15,
    backgroundColor: '#F0F0C9',
    position: 'absolute',
    bottom: 0,
  },
  icon: {
    fontSize: 24,
  },
});
