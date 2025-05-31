import { Pressable, StyleSheet, Text, TextInput, View, Alert, Image } from 'react-native';
import React, { useState, useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';


const Profil = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [photo, setPhoto] = useState(null); // État pour la photo
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().username || 'Utilisateur');
          }
        } catch (error) {
          console.error('Erreur Firestore :', error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, []);
  

  const handleSave = () => {
    Alert.alert('Profil mis à jour', `Email: ${email}\nTéléphone: ${phone}\nLocalisation: ${localisation}`);
  };

  const handlePickImage = async () => {
    // Demander la permission d’accéder aux photos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission refusée", "Vous devez autoriser l'accès aux photos pour continuer.");
      return;
    }

    // Ouvrir la galerie pour choisir une image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!pickerResult.canceled) {
      setPhoto(pickerResult.assets[0].uri);
    }
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        router.replace('/(auth)/login');
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error.message);
      }
    };

  return (
    <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}>
      <Text style={styles.up}>{username}</Text>

      <Pressable onPress={handlePickImage} style={styles.imageContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <Text style={styles.addPhotoText}>Ajouter une photo</Text>
        )}
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.info, styles.box]}
          value={email}
          onChangeText={setEmail}
          placeholder='exemple@gmail.com'
          keyboardType='email-address'
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Tél:</Text>
        <TextInput
          style={[styles.info, styles.box]}
          value={phone}
          onChangeText={setPhone}
          placeholder='06 00 00 00 00'
          keyboardType='phone-pad'
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Localisation:</Text>
        <TextInput
          style={styles.box}
          value={localisation}
          onChangeText={setLocalisation}
          placeholder='Casablanca, Maroc'
        />
      </View>

      <Pressable style={({ pressed }) => [styles.btn, pressed && styles.pressed]} onPress={handleSave}>
        <Text style={{ color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>Sauvegarder</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.btndec, pressed && styles.pressed]} onPress={handleLogout}>
        <Text style={{ color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>
          Se déconnecter
        </Text>
      </Pressable>

    </LinearGradient>
  );
};

export default Profil;

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
  up: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 120,
  },
  addPhotoText: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
  },
  btndec: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    width: '70%',
    marginTop: 20,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  info: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    color: 'black',
  },
  label: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  box: {
    opacity: 0.7,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
});
