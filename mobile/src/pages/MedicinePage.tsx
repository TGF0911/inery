import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import logoImg from '../assets/logo-medicine.png'
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';


interface Medicine {
  id: number;
  name: string;
  description: string;
  photo: string;
}

interface RouteParams {
  id : number
}

export default function MedicinePage() {

  const [medicines, setMedicines] = useState<Medicine[]>([])
  const routes = useRoute()

  const params = routes.params as RouteParams

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack()
  }

  function handleAddMedicine(medicine_id: number) {
    navigation.navigate('HorarioPage', {medicine_id})
  }

  function navigateToHorarioPage() {
    navigation.navigate('HorarioPage');
  }

  useEffect(() => {
    api.get('/medicine').then(({ data }) => setMedicines(data))
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>Escolha o medicamento</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900" />
        </TouchableOpacity>

      </View>

      <ScrollView style={styles.menu}>

        {medicines.map(medicine => {
          return (
            <View style={styles.remedio} key={medicine.id} >
              <View >
                <Text style={styles.remedioText}>
                  Nome:
            </Text>
                <Text style={styles.remedioText}>
                  {medicine.name}
           </Text>
                <Text style={styles.remedioText}>
                  Descrição:
            </Text>
                <Text style={styles.remedioText}>
                  {medicine.description}
           </Text>
              </View>
              <TouchableOpacity onPress={() => handleAddMedicine(medicine.id)}> 
                <Feather name="plus" size={28} color="#008db7"/>
              </TouchableOpacity>
            </View>

          )
        })}










      </ScrollView>

      {/* <TouchableOpacity style={styles.nextButton} onPress={() => navigateToHorarioPage()}>
        <Text style={styles.nextButtonText}>Escolher Horário</Text>
        <Feather name="arrow-right-circle" size={28} color="#fff" />
      </TouchableOpacity> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",

  },
  header: {
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingTop: 15
  },
  headerText: {
    fontSize: 20,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight: 20
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold',
  },
  menu: {
    marginHorizontal: 15,
  },
  remedio: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  remedioText: {
    color: 'gray'
  },
  nextButton: {
    backgroundColor: "#008db7",
    borderRadius: 20,
    alignItems: 'center',
    height: 56,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },
})