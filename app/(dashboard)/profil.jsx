import { Pressable, StyleSheet, Text, TextInput, View ,Alert} from 'react-native'
import React,{useState} from 'react'



const profil = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [localisation, setLocalisation] = useState('');

  const handleSave = () => {
    Alert.alert('Profil mis à jour', `Email: ${email}\nTéléphone: ${phone}\nLocalisation: ${localisation}`);
  };

  return(
    <View style={styles.container}>
       <Text style={styles.up}> Votre profile </Text>
      <View style={styles.info}> 
         <Text style={styles.label}>Email: </Text>
         <TextInput
          style={[styles.info, {backgroundColor:'#F5F5DC'}]}
            value={email}
            onChangeText={setEmail}
            placeholder='exemple@gmail.com'
            keyboardType='email-address'/>
      </View>
      
      <View style={styles.info}> 
         <Text style={styles.label}>Tél: </Text>
         <TextInput
            style={[styles.info, {backgroundColor:'#F5F5DC'}]}
            value={phone}
            onChangeText={setPhone}
            placeholder='06 00 00 00 00'
            keyboardType='phone-pad'/>
      </View>

      <View style={styles.info}> 
         <Text style={styles.label}>Localisation: </Text>
         <TextInput
            style={[styles.info, {backgroundColor:'#F5F5DC'}]}
            value={localisation}
            onChangeText={setLocalisation}
            placeholder='Casablanca,Maroc'
           />
      </View>

      <Pressable style={({ pressed }) => [styles.btn, pressed && styles.pressed]} onPress={handleSave}>
        <Text style={{ color: 'white', fontFamily: 'monospace',fontWeight:'bold' }}>Sauvegarder</Text>
      </Pressable>

    </View>

  )
  
}

export default profil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5dc',
    borderColor:'#006400',
    borderWidth: 20,
  },
  up: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  btn:{
    backgroundColor:'#f4b700',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  pressed:{
    opacity:0.8
  },
  info: {
    width: '100%',
    marginBottom: 15,
    opacity:0.8,
    borderRadius: 10,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    fontFamily: 'monospace',
  },
})