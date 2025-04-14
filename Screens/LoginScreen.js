import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // ajuste o caminho conforme seu projeto

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (email === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Home'); // ou sua tela principal
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Email ou senha inválidos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#f2f2f2', padding: 20, justifyContent: 'center',
  },
  title: {
    fontSize: 26, marginBottom: 24, textAlign: 'center', fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff', padding: 12, borderRadius: 8,
    marginBottom: 12, fontSize: 16,
  },
  button: {
    backgroundColor: '#4A90E2', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 12,
  },
  buttonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold',
  },
  link: {
    marginTop: 16, textAlign: 'center', color: '#4A90E2', fontSize: 15,
  },
});
