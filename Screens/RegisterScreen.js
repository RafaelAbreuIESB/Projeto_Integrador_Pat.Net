import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    // Lógica de cadastro
    console.log('Cadastro com:', email, senha);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <CustomInput placeholder="E-mail" value={email} setValue={setEmail} />
      <CustomInput placeholder="Senha" secureTextEntry value={senha} setValue={setSenha} />
      <CustomInput placeholder="Confirmar Senha" secureTextEntry value={confirmarSenha} setValue={setConfirmarSenha} />
      <Button title="Cadastrar" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Já tem conta? Faça login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});
