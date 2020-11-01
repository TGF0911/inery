import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../service/api';


// interface Patient {
//   id: number;
//   email: string;
//   password: string;
// }

export default function LoginPage() {

  // const [patient, setPatient] = useState<Patient>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { navigate } = useNavigation()

  async function handleLogin() {

    try {
      const { data: patient } = await api.post(`/session/${email}`);

      patient && patient.password === password
        ? navigate('HomePage', { patient })
        : alert('Senha incorreta!');
      } catch (error) {
        alert(error)
        alert('Usuário não encontrado!');
        alert(email)
    }
  }



return (
  <View style={styles.container}>
    <View>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
        <Text style={styles.nextButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FF9900',
    justifyContent: 'center',
  },
  label: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: "#DD3355",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 28,
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },
  withoutRegister: {
    color: '#87F7CC',
    marginTop: 8,
  }
})