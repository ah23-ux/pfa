import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Associer les catégories à leur image
const categories = [
  { name: 'Blé', image: require('../assets/plants/ble.jpg') },
  { name: 'Pomme', image: require('../assets/plants/pomme.jpg') },
  { name: 'Tomate', image: require('../assets/plants/tomate.jpg') },
  { name: 'Betterave', image: require('../assets/plants/betterave.jpg') },
  { name: 'Fraise', image: require('../assets/plants/fraise.jpg') },
];

const Index = () => {
  const router = useRouter();

  const handleCategoryPress = (category) => {
    if (category.name === 'Betterave') {
      router.push('/NouvelleDetection');
    } else {
      alert(`Tu as cliqué sur ${category.name}`);
    }
  };

  return (
    <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}>
      <Text style={styles.title}>Catégories de plantes</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => handleCategoryPress(category)}
            style={({ pressed }) => [styles.buttonWrapper, pressed && styles.pressed]}
          >
            <ImageBackground
              source={category.image}
              style={styles.button}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.overlay} />
              <Text style={styles.buttonText}>{category.name}</Text>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#e8f5e9'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center'
  },
  scrollContainer: {
    paddingHorizontal: 20
  },
  buttonWrapper: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4
  },
  button: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12
  },
  pressed: {
    opacity: 0.9
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5
  }
});