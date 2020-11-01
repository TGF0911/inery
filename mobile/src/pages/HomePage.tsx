import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image
} from 'react-native';

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
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>Meus Alarmes</Text>
      </View>
{/* 
      <TouchableOpacity style={styles.nextButton} onPress={() => navigateToMedicinePage()}>
            <Text style={styles.nextButtonText}>Novo Alarme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigateToAlarmDetails()}>
            <Text style={styles.nextButtonText}>ALARM DETAILS</Text>
      </TouchableOpacity> */}

      <ScrollView style={styles.menu}>

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
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#DCDCDC",
  },

  header: {
    padding:5,
    paddingHorizontal:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor:'#fff',
    paddingTop:15,
    marginBottom:10
  },

  headerText: {
    fontSize: 30,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight:20
  },

  headerTextBold: {
    fontWeight: 'bold',
  },
  menu:{
    marginHorizontal:15,
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
    alignItems: 'center'
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
    marginHorizontal:15,
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },

})