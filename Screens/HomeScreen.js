import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../ThemeContext'; // Import do contexto de tema

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

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

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo à Home!</Text>

      {/* Botão para alternar o tema */}
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Text style={styles.themeToggleText}>
          {isDarkMode ? '☀️ Claro' : '🌙 Escuro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: width * 0.05,
      backgroundColor: isDarkMode ? '#333' : '#f2f2f2',
      justifyContent: 'center',
    },
    headerButton: {
      marginRight: 15,
      backgroundColor: '#b5f7cd',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    headerButtonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    welcome: {
      fontSize: width * 0.06,
      textAlign: 'center',
      color: isDarkMode ? '#fff' : '#000',
    },
    themeToggle: {
      position: 'absolute',
      bottom: 40,
      right: 20,
      backgroundColor: isDarkMode ? '#000' : '#b5f7cd',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    themeToggleText: {
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
    },
  });
