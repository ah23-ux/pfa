import { Pressable, StyleSheet, Text, TextInput, View ,Alert} from 'react-native'
import React,{useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';


const profil = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [localisation, setLocalisation] = useState('');

  const handleSave = () => {
    Alert.alert('Profil mis à jour', `Email: ${email}\nTéléphone: ${phone}\nLocalisation: ${localisation}`);
  };

  return(
    <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}>
       <Text style={styles.up}> Votre profile </Text>
      <View style={styles.info}> 
         <Text style={styles.label}>Email: </Text>
         <TextInput
          style={[styles.info, styles.box]}
            value={email}
            onChangeText={setEmail}
            placeholder='exemple@gmail.com'
            keyboardType='email-address'/>
      </View>
      
      <View style={styles.info}> 
         <Text style={styles.label}>Tél: </Text>
         <TextInput
            style={[styles.info, styles.box]}
            value={phone}
            onChangeText={setPhone}
            placeholder='06 00 00 00 00'
            keyboardType='phone-pad'/>
      </View>

      <View style={styles.info}> 
         <Text style={styles.label}>Localisation: </Text>
         <TextInput
            style={styles.box}
            value={localisation}
            onChangeText={setLocalisation}
            placeholder='Casablanca,Maroc'
           />
      </View>

      <Pressable style={({ pressed }) => [styles.btn, pressed && styles.pressed]} onPress={handleSave}>
        <Text style={{ color: 'white', fontFamily: 'monospace',fontWeight:'bold' }}>Sauvegarder</Text>
      </Pressable>

    </LinearGradient>

  )
  
}

export default profil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#e8f5e9', // un vert très pâle
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
  btn:{
    backgroundColor:'pink',
    padding: 15,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
  },
  pressed:{
    opacity:0.8
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
  
  box:{
    
    opacity: 0.7,
    borderWidth: 2,         // épaisseur du cadre
    borderColor: 'green',   // couleur du cadre
    borderRadius: 8         // optionnel : bords arrondis
  }
})