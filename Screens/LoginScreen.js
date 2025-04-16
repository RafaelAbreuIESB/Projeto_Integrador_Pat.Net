import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login bem-sucedido:', user.email);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      Alert.alert('Erro de Login', 'E-mail ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity >
      <Text style={styles.Button} onPress={handleLogin}>
          Entrar
        </Text>
        <Text style={styles.Button} onPress={() => navigation.navigate('Register')}>
          Criar conta
        </Text>
      </TouchableOpacity>  
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  link: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center'
  },
  Button:{
    backgroundColor: "#32ea63",
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    textAlign:"center",
  },
  
});
