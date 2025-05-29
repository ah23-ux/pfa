import React from 'react';
import { useState } from 'react';              //Mémoriser une image ou un état dans ton composant
import { Image } from 'react-native';     //Afficher une image sur l’écran
import * as ImagePicker from 'expo-image-picker'; //pour expo  //Ouvrir la galerie et récupérer l’imag
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Link} from 'expo-router'
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';






const NouvelleDetection = () => {

  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Fonction pour choisir une image dans la galerie
    const choisirImage = async () => { //c'est une fct asynchrone (a chercher ce que ca veut dire )
        try {
             // Demander la permission d'accéder à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    //Si la permission est refusée, on arrête tout
    if (status !== 'granted') {
      console.log('Permission refusée');
      return;
    }

    //Ouvrir la galerie pour sélectionner une image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // On ne veut que des images
      quality: 1, // Qualité maximale
    });

    //Si l'utilisateur annule la sélection
    if (result.canceled) {
      console.log('Sélection annulée');
      return;
    }

    // Extraire et enregistrer l'URI de l'image sélectionnée
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri); // Mise à jour de l'état
    }
  } catch (err) {
    console.warn('Erreur lors de la sélection de l’image :', err);
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
    const response = await fetch('http://192.168.98.90:5000/predict', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const json = await response.json();

    if (json.status === 'success') {
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
  <View style={styles.container}>
    <Text style={styles.logo}>Planty</Text>
    <Text style={styles.title}>Nouvelle Détection</Text>

    <TouchableOpacity style={styles.chooseImageButton} onPress={choisirImage}>
      <Text style={styles.chooseImageText}>+ Choisir une image</Text>
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
    borderWidth: 20,
  },
  /*card: {
    flex: 1,
    backgroundColor: '#f5f5dc', //'#7bd198'
    width: '90%',
    height: '90%',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 30,
    gap: 20,
    marginTop: 20,
  alignItems: 'center',
  justifyContent: 'center',
  },*/
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
    marginTop:20,
  },
  chooseImageButton: {
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop:20,
  },
  chooseImageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:20,
  },
  imagePlaceholder: {
    backgroundColor: '#f5f5dc',
    width: '80%',
    height: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
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
  },
  analyzeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
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

export default NouvelleDetection;