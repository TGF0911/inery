import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import logoImg from '../assets/logo-medicine.png'
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';
import convertMinutesToHours from '../utils/convertToHours';


interface Recipe {
  id: number;
  name: string;
  medicine_id: number;
  description: string;
  alarms: Array<{
    id: number;
    hour: number;
  }>
}

interface RouteParams {
  id: number;
}


export default function AlarmDetails() {

  const route = useRoute()
  const params = route.params as RouteParams


  const [recipe, setRecipe] = useState<Recipe>()


  const { navigate, goBack } = useNavigation();
  
  useEffect(() => {
    api.get(`/recipe/${params.id}`).then(({ data }) => setRecipe(data));
  }, [params.id])
  
  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  
    function navigateBack() {
      goBack()
    }
  
    function changeHour(hours: number) {
      const [hour, minutes] = convertMinutesToHours(hours)
  
      return `${hour}:${minutes}`
    }

  async function handleDeleteAlarm(id: number) {
    await api.delete(`/alarm/${id}`);
    alert('Este alarme foi deletado.');
    navigate('HomePage');
  }


  function navigateToAlarmUpdate() {
    navigation.navigate('AlarmUpdate');
}

  async function handleDeleteRecipe(id: number) {
    await api.delete(`/recipe/${id}`)
    alert('Este alarme foi deletado.');
    navigate('HomePage');
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>Alarme</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900" />
        </TouchableOpacity>

      </View>
      <ScrollView style={styles.menu}>

        <View style={styles.remedio}>
          <Image source={logoImg} />
          <View >
            <Text style={styles.remedioText}>
              Nome:
            </Text>
            <Text style={styles.remedioText}>
              {/* {medicine.name} */}
            </Text>
            <Text style={styles.remedioText}>
              Descrição:
            </Text>
            <Text style={styles.remedioText}>
              {/* {medicine.description} */}
            </Text>
          </View>
        </View>

        <Text style={styles.menuText}>
          {recipe.description}
        </Text>

        <View style={styles.alarme}>
         <View >
            <Text style={styles.alarmeTextGrande}>
            Horário: 18:00
            </Text>
            <Text style={styles.alarmeTextPqno}>
             Remédio anti-alérgico
            </Text>
          </View>
          <View style={styles.alarmeBotao}>
            <TouchableOpacity onPress={()=>alert('delete')}>
              <Feather name="trash-2" size={28} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigateToAlarmUpdate()}>
              <Feather name="edit" size={28} color="#37C77F"/>
            </TouchableOpacity>
          </View>
        </View>

        {recipe.alarms.map((alarm) => {
          return (


            <View style={styles.alarme} key={alarm.id} >
              <View >

                <Text style={styles.alarmeTextGrande}>
                  Horário: {changeHour(alarm.hour)}
                </Text>

              </View>
              <View style={styles.alarmeBotao}>
                <TouchableOpacity onPress={() => handleDeleteAlarm(alarm.id)}>
                  <Feather name="trash-2" size={28} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate("UpdateAlarm")}>
                  <Feather name="edit" size={28} color="#37C77F" />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}

        <TouchableOpacity style={styles.nextButton} onPress={() => handleDeleteRecipe(recipe.id)}>
          <Text style={styles.nextButtonText}>Deletar</Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",

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
  menuText: {
    marginBottom: 20
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
  alarme: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  alarmeTextGrande: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  alarmeTextPqno: {
    marginBottom: 20
  },
  alarmeBotao: {
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
})