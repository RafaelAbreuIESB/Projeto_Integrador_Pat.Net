import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'Tem certeza?',
      'Você realmente deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => navigation.replace('Login'),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Colocar o botão de sair no cabeçalho
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Sair</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo à Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  headerButton: {
    marginRight: 15,
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: width * 0.06,
    textAlign: 'center',
  },
});
