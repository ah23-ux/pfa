import React from 'react';
import { useState } from 'react';              //Mémoriser une image ou un état dans ton composant
import { Image } from 'react-native';     //Afficher une image sur l’écran
import * as ImagePicker from 'expo-image-picker'; //pour expo  //Ouvrir la galerie et récupérer l’imag
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Link} from 'expo-router'




const NouvelleDetection = () => {

  const [imageUri, setImageUri] = useState(null);
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
         
  let contenuImage;
  if(imageUri){
    contenuImage=(
      <Image
      source={{uri:imageUri}}
      style={{width: '100%', height: '100%', borderRadius: 40}}
        resizeMode="cover" />
    );
  } else{
    contenuImage = (
       <Text style={styles.imagePlaceholderText}>Miniature de l'image</Text>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>LOGO</Text>
        <Text style={styles.title}>Nouvelle Détection</Text>
        
        <TouchableOpacity style={styles.chooseImageButton} onPress={choisirImage}>
          <Text style={styles.chooseImageText}>+ Choisir une image</Text>
        </TouchableOpacity>
        
        <View style={styles.imagePlaceholder}>
           {contenuImage}
        </View>

        <TouchableOpacity style={styles.analyzeButton}>
          <Text style={styles.analyzeButtonText}>Analyser</Text>
        </TouchableOpacity>
        <View style={styles.bottomBar}>
          <Link href="/" asChild>
             <TouchableOpacity>
               <Icon name="home" size={25} color="black" />
            </TouchableOpacity>
          </Link>
             <TouchableOpacity>
              <Icon name="user" size={25} color="black" />
              </TouchableOpacity>
       </View>
      </View>

      
       
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#066625',
    paddingVertical: 10,
    alignItems: 'center',
  justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#3fb056',
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
    marginTop:'auto',
  },
  chooseImageButton: {
    backgroundColor: '#05822e',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop:'auto',
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
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'auto',
  },
  imagePlaceholderText: {
    color: '#000',
    fontSize: 16,
  },
  analyzeButton: {
    backgroundColor: '#f4b700',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 20,
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