import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const { width } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const errors = [];

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const lowercaseRegex = /[a-z]/;


    if (!email || !password || !confirmPassword) {
      errors.push('Preencha todos os campos.');
    }

    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres.');
    }

    if (!uppercaseRegex.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula.');
    }

    if (!numberRegex.test(password)) {
      errors.push('A senha deve conter pelo menos um número.');
    }

    if (!specialCharRegex.test(password)) {
      errors.push('A senha deve conter pelo menos um caractere especial.');
    }

    if (password !== confirmPassword) {
      errors.push('As senhas não coincidem.');
    }

    if (errors.length > 0) {
      Alert.alert('Erro no Registro', errors.join('\n'));
      return;
    }

    if (!lowercaseRegex.test(password)){
      errors.push("A senha deve ter pelo menos uma letra minúscula")
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro no registro:', error.message);
      let msg = 'Erro ao criar conta.';
      if (error.code === 'auth/email-already-in-use') {
        msg = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'E-mail inválido.';
      }
      Alert.alert('Erro', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Registrar" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Já tem conta? Faça login
      </Text>
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
  }
});
