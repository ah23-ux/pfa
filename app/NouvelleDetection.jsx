import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase'; // Assure-toi que ce chemin est correct
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';     //Afficher une image sur l’écran
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';




const enregistrerAnalyse = async (imageURL, resultatTexte) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    console.warn("Utilisateur non connecté");
    return;
  }

  try {
    await addDoc(collection(db, 'analyses'), {
      userId: user.uid,
      imageURL: imageURL,
      resultat: resultatTexte,
      date: new Date()
    });
    console.log('Analyse enregistrée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l’enregistrement :', error);
  }
};

const NouvelleDetection = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const choisirImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission galerie refusée');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) {
        console.log('Sélection annulée');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.warn('Erreur sélection image :', err);
    }
  };

  const prendrePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission appareil photo refusée');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) {
        console.log('Prise de photo annulée');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.warn('Erreur prise photo :', err);
    }
  };

 // Fonction pour envoyer l'image au serveur et naviguer vers la page résultat
 const envoyerImage = async () => {
  if (!imageUri) {
    Alert.alert('Aucune image', 'Veuillez choisir une image avant de lancer l’analyse.');
    return;
  }
  setLoading(true);
  // Préparation du formData pour envoyer l'image en multipart/form-data
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });
  console.log('Sending image:', {
    uri: imageUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });
  
  try {
    const response = await fetch('http://192.168.1.11:5000/predict', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const json = await response.json();

    if (json.status === 'success') {
      await enregistrerAnalyse(imageUri, json.prediction); // 🔥 Enregistrement dans Firestore
      // Navigation vers la page Resultat avec les paramètres
      router.push({
        pathname: '/Resultat',
        params: {
          prediction: json.prediction,
          confidence: json.confidence.toString(), // passer en string car params URL
        },
      });
    } else {
      Alert.alert('Erreur', 'Le serveur n’a pas retourné de prédiction valide.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Erreur réseau', 'Impossible de contacter le serveur.');
  } finally {
    setLoading(false);
  }
};
         
 
return (
  <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}>
    <Text style={styles.logo}>Planty</Text>
    <Text style={styles.title}>Nouvelle Détection</Text>

    <TouchableOpacity style={styles.chooseImageButton} onPress={choisirImage}>
      <Text style={styles.chooseImageText}>+ Choisir une image</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.chooseImageButton} onPress={prendrePhoto}>
      <Text style={styles.chooseImageText}>📷 Prendre une photo</Text>
    </TouchableOpacity>


    <View style={styles.imagePlaceholder}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%', borderRadius: 40 }} resizeMode="cover" />
      ) : (
        <Text style={styles.imagePlaceholderText}>Miniature de l'image</Text>
      )}
    </View>

    <TouchableOpacity
      style={[styles.analyzeButton, loading && { backgroundColor: 'gray' }]}
      onPress={envoyerImage}
      disabled={loading}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.analyzeButtonText}>Analyser</Text>}
    </TouchableOpacity>
    </LinearGradient>
);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    color: '#006400',
    fontWeight: 'bold',
    fontSize: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginTop: 20,
  },
  chooseImageButton: {
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  chooseImageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  imagePlaceholder: {
    backgroundColor: '#f5f5dc',
    width: '80%',
    height: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imagePlaceholderText: {
    color: '#000',
    fontSize: 16,
  },
  analyzeButton: {
    backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  analyzeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default NouvelleDetection;
