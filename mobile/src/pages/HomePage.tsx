import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image
} from 'react-native';
import Constants from 'expo-constants';

import logoImg from '../assets/logo-medicine.png'

import { Feather } from '@expo/vector-icons';
import api from '../service/api';
import { useNavigation } from '@react-navigation/native';
import convertMinutesToHours from '../utils/convertToHours';



interface Recipe {
  id: number;
  name: string;
  medicine_id: number
  description: string;
  alarms: Array<{
    id: number;
    hour: number;
    week_days : Array<{
      id: number;
      week_day: number;
    }>
  }>
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

   const navigation = useNavigation();

   function navigateToAlarmDetails(id : number) {
       navigation.navigate('AlarmDetails', {id});
   }

   function changeHour(hour : number){
    const [hours, minutes] = convertMinutesToHours(hour)
    return `${hours}:${minutes}`
   }


  useEffect(() => {
    api.get('/recipe', {headers : {authorization : 3}}).then(({ data }) => setRecipes(data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.title}>Bem vindo(a)! Thais </Text>
        
      </View>

      <Text style={styles.description}>Aqui estão seus alarmes. Fique atento(a)!!</Text>

      <View>

      <View style={styles.recipesList} >
          {recipes.map((recipe: Recipe) => (

            <View style={styles.recipes} key={recipe.id}>
              <Text style={styles.recipesValue}>{recipe.id}</Text>
              <Text style={styles.recipesProperty}>Nome:</Text>
              <Text style={styles.recipesValue}>{recipe.name}</Text>

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
      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 15,
    color: '#737380',
  },

  headerTextBold: {
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
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
    alignItems: 'center'
  },

  detailsButtonText: {
    color: '#E02041',
    fontSize: 15,
    fontWeight: 'bold',
  }

})