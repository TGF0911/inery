import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';
import { CheckBox } from 'react-native-elements'

interface RouteParams {
  medicine_id: number;
  pacient_id: number;
}
export default function HorarioPage() {

  const navigation = useNavigation();
  const route = useRoute()

  const params = route.params as RouteParams

  const [hours, setHours] = useState('')
  const [week_days, setWeekDays] = useState<Array<number>>([])
  const [description, setDescription] = useState('')

  function navigateBack() {
    navigation.goBack()
  }

  async function handleCreate() {
    const data = new FormData();

    data.append('medicine_id', String(params.medicine_id))
    data.append('hours', hours)
    data.forEach((week_days) => {
      data.append('week_days', week_days)
    })

    await api.post('/recipe', { headers: { authorization: params.pacient_id } })

    navigation.navigate('HomePage')
  }


  const [domingo, onChangeDomingo] = useState(false);
  const [segunda, onChangeSegunda] = useState(false);
  const [terca, onChangeTerca] = useState(false);
  const [quarta, onChangeQuarta] = useState(false);
  const [quinta, onChangeQuinta] = useState(false);
  const [sexta, onChangeSexta] = useState(false);
  const [sabado, onChangeSabado] = useState(false);

  function handleWeekDays(weeks: boolean) {
    if (weeks === domingo) {
      const week = [0]
      setWeekDays(week)
    }
    if (weeks === segunda) {
      const week = [1]
      setWeekDays(week)
    }
    if (weeks === terca) {
      const week = [2]
      setWeekDays(week)
    }
    if (weeks === quarta) {
      const week = [3]
      setWeekDays(week)
    }
    if (weeks === quinta) {
      const week = [4]
      setWeekDays(week)
    }
    if (weeks === sexta) {
      const week = [5]
      setWeekDays(week)
    }
    if (weeks === sabado) {
      const week = [6]
      setWeekDays(week)
    }


  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Escolha o horário</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900" />
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>

        <Text style={styles.horaTexto}>Descrição:</Text>
        <TextInput
          style={styles.horaTextoInput}
          value={description}
          onChangeText={(value) => setDescription(value)}
        />


        <Text style={styles.horaTexto}>Hora(HH:MM):</Text>
        <TextInput
          style={styles.horaTextoInput}
          value={hours}
          onChangeText={(value) => setHours(value)}
        />




        <ScrollView style={styles.menu}>
          <Text style={styles.horaTexto}>Dia da Semana:</Text>
          <CheckBox
            checked={domingo}
            center
            title='Domingo'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => 
              {
                onChangeDomingo(!domingo)
                handleWeekDays(domingo)
              }
            }
          />
          <CheckBox
            checked={segunda}
            center
            title='Segunda-Feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              onChangeSegunda(!segunda)
              handleWeekDays(segunda)
            }
            }
          />
          <CheckBox
            checked={terca}
            center
            title='Terça-Feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              onChangeTerca(!terca)
              handleWeekDays(terca)
            }}
          />
          <CheckBox
            checked={quarta}
            center
            title='Quarta-Feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => 
              {
                onChangeQuarta(!quarta)
                handleWeekDays(quarta)
              }
            }

          />
          <CheckBox
            checked={quinta}
            center
            title='Quinta-Feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => 
            {
              onChangeQuinta(!quinta)
              handleWeekDays(quinta)
            }
            
            }
          />
          <CheckBox
            checked={sexta}
            center
            title='Sexta-Feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              onChangeQuinta(!sexta)
              handleWeekDays(sexta)
            }}
          />
          <CheckBox
            checked={sabado}
            center
            title='Sábado'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              onChangeQuinta(!sabado)
              handleWeekDays(sabado)
            }}
          />
        </ScrollView>
        <TouchableOpacity style={styles.nextButton} onPress={() => handleCreate}>
          <Feather name="save" size={25} color="#fff" />
          <Text style={styles.nextButtonText}>Cadastrar novo Alarme</Text>
        </TouchableOpacity>
      </View>
    /</View>
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
    fontSize: 30,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight: 20,
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
  horaTexto: {
    fontSize: 25,
    marginLeft: 10,
    color: 'gray',
    marginTop: 8,
    marginBottom: 10
  },
  horaTextoInput: {
    borderRadius: 15,
    padding: 15,
    fontSize: 20,
    marginBottom: 10,
    color: 'gray',
    backgroundColor: '#fff',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: "#1f6af7",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 28,
    marginBottom: 50,
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },
})