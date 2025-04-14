import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Implementar lógica de autenticação
    console.log('Login com:', email, senha);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <CustomInput placeholder="E-mail" value={email} setValue={setEmail} />
      <CustomInput placeholder="Senha" secureTextEntry value={senha} setValue={setSenha} />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Cadastro')}>
        Não tem conta? Cadastre-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});
