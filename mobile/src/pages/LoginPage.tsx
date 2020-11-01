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

  const navigation = useNavigation()

  async function handleLogin() {
    const data = new FormData();

    
    data.append('email', email)
    data.append('password', password)

    
    const pacient = await api.post('/session', data)
    console.log(data)

    if(pacient.status === 401) {
      return alert('Verifique os dados novamente.')
    }

   navigation.navigate('HomePage')

  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
          <Text style={styles.nextButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('ZZZ')}>
          <Text style={styles.withoutRegister}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('ZZZ')}>
          <Text style={styles.withoutRegister}>Ainda não se cadastrou?</Text>
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