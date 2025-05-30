import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useRouter } from 'expo-router';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Register() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [plantesExpert, setPlantesExpert] = useState([]);
  const plantesDisponibles = ['Betterave', 'Blé', 'Tomate']; // à adapter
  const router = useRouter();

  const handleRegister = async () => {
    if (!prenom || !nom || !username || !email || !password || !role || !phone) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires, y compris le rôle');
      return;
    }
    if (role === 'expert' && plantesExpert.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins une plante si vous êtes expert');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erreur', 'Email invalide');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Mot de passe trop court');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        prenom,
        nom,
        username,
        email,
        phone,
        role,
        createdAt: new Date(),
      });
      if (role === 'expert') {
        await setDoc(doc(db, 'experts', user.uid), {
          uid: user.uid,
          nom,
          prenom,
          email,
          phone,
          plantes: plantesExpert,  // tableau des plantes suivies
          createdAt: new Date(),
        });
      }
      router.replace('/(dashboard)');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FontAwesome5 name="leaf" size={40} color="green" style={{ marginBottom: 10 }} />
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Nom d'utilisateur" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />

      <Text style={styles.roleLabel}>Je suis :</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'agriculteur' && styles.selectedRole]}
          onPress={() => setRole('agriculteur')}
        >
          <Text style={styles.roleText}>Agriculteur</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === 'expert' && styles.selectedRole]}
          onPress={() => setRole('expert')}
        >
          <Text style={styles.roleText}>Expert</Text>
        </TouchableOpacity>
      </View>
      {role === 'expert' && (
        <>
          <Text style={styles.roleLabel}>Plantes suivies :</Text>
          {plantesDisponibles.map(plante => (
            <TouchableOpacity
              key={plante}
              onPress={() => {
                if (plantesExpert.includes(plante)) {
                  setPlantesExpert(plantesExpert.filter(p => p !== plante));
                } else {
                  setPlantesExpert([...plantesExpert, plante]);
                }
              }}
              style={{
                backgroundColor: plantesExpert.includes(plante) ? '#c0ffc0' : '#eee',
                padding: 8,
                borderRadius: 5,
                marginVertical: 4,
              }}
            >
              <Text>{plantesExpert.includes(plante) ? '✓ ' : ''}{plante}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0fff0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  roleLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: '#006400',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#d3f8e2',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedRole: {
    backgroundColor: '#32CD32',
    borderColor: '#006400',
  },
  roleText: {
    color: '#006400',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
