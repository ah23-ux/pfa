import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const categories = [
  'Blé',
  'Pomme',
  'Tomate',
  'Betterave',
  'Fraise',
  'Carotte',
  'Pomme de terre'
];

const Index = () => {
  const router = useRouter();

  const handleCategoryPress = (category) => {
    if (category === 'Betterave') {
      router.push('/(dashboard)/home');
    } else {
      alert(`Tu as cliqué sur ${category}`);
    }
  };

  return (
    <LinearGradient colors={['#e8f5e9', '#d0f0c0']} style={styles.container}>
      <Text style={styles.title}>🌱 Catégories de plantes</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006400', marginBottom: 20, textAlign: 'center' },
  scrollContainer: { alignItems: 'center', justifyContent: 'center' },
  button: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center'
  },
  pressed: { opacity: 0.8 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
