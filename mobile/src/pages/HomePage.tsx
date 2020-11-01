import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image
} from 'react-native';

import logoImg from '../assets/logo-medicine.png'

import { Feather } from '@expo/vector-icons';
import api from '../service/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import convertMinutesToHours from '../utils/convertToHours';

interface Recipe {
  id: number;
  medicine_id: number
  description: string;
  alarms: Array<{
    id: number;
    hour: number;
    week_days: Array<{
      id: number;
      week_day: number;
    }>
  }>
}

interface RouteParams {
  patient: {
    id: number;
    photo: string;
  }
}


export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const routes = useRoute()
  const params = routes.params as RouteParams
  const navigation = useNavigation();

  function navigateToAlarmDetails(id: number) {
    navigation.navigate('AlarmDetails', { id });
  }

  function navigateToProfile(id: number) {
    navigation.navigate('Profile', { id })
  }

  function changeHour(hour: number) {
    const [hours, minutes] = convertMinutesToHours(hour)
    return `${hours}:${minutes}`
  }

  useEffect(() => {
    api.get('/recipe', { headers: { authorization: params.patient.id } }).then(({ data }) => setRecipes(data));
  }, [params.patient.id]);

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigateToProfile(params.patient.id)}
          style={styles.profile}>


          <Text>Perfil</Text>

            <Text style={styles.profileText}>Meus</Text>
          <Text style={styles.profileText}>Dados</Text>

          <Feather name="edit" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Meus Alarmes</Text>
      </View>

      <TouchableOpacity style={styles.detailsButton} >
        <Text>Criar novos alarmes</Text>
        <Feather name="plus" size={25} />
      </TouchableOpacity>

      <ScrollView style={styles.menu}>

        <View style={styles.recipesList} >
          {recipes.map((recipe: Recipe) => (

            <View style={styles.recipes} key={recipe.id}>
              <Text style={styles.recipesProperty}>Descrição:</Text>
              <Text style={styles.recipesValue}>{recipe.description}</Text>

              <Text style={styles.recipesProperty}>Horarios:</Text>
              {recipe.alarms.map((alarm) => {
                return (
                  <View key={alarm.id}>
                    <Text>Horários: {changeHour(alarm.hour)}</Text>
                  </View>
                )
              })}

              <TouchableOpacity style={styles.detailsButton}
                onPress={() => navigateToAlarmDetails(recipe.id)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#E02041" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4dadc',
  },
  profile: {
    width: 80,
    height: 80,
    alignItems: 'center',
    backgroundColor:'#06bcee',
    borderRadius:5,
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#07aae0'
  },
  profileText: {
    color: 'white',
    fontSize: 17
  },
  header: {
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  headerText: {
    fontSize: 30,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight: 20
  },

  headerTextBold: {
    fontWeight: 'bold',
  },
  menu: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 15,
    color: '#13131a',
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380',
  },

  recipesList: {
    marginTop: 32
  },

  recipes: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },

  recipesProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
  },

  recipesValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380',
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop : 10,
  },

  detailsButtonText: {
    color: '#E02041',
    fontSize: 15,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: "#DD3355",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },

})