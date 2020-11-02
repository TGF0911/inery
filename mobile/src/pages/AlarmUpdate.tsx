import React, { useEffect, useState } from 'react';
import { StyleSheet,TextInput, View, Text,  TouchableOpacity, } from 'react-native';
import {Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';

interface Alarm {
  id: number;
  hour: number;
}

interface RouteParams {
  id: number;
}

export default function AlarmUpdate() {
  
  const [alarm, setAlarm] = useState<Alarm>()
  const route = useRoute()
  const params = route.params as RouteParams

  const [hour, setHour] = useState(alarm?.hour)

  useEffect(() => {
    api.get(`alarm/${params.id}`).then((response) => {
      setAlarm(response.data);
    });
    console.log(params.id)
  }, [params.id]);

  async function handleUpdateAlarm(){
    await api.put(`/alarm/${params.id}`, { 
      ...alarm,
      hour
    })

    navigation.navigate('HomePage')
  }

 


  const navigation = useNavigation();

  function navigateBack(){
    navigation.goBack()
  }
  
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Alterar alarme</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900"/>
        </TouchableOpacity>
     
      </View>
        
        <TouchableOpacity style={styles.nextButton} onPress={handleUpdateAlarm}>
        <Feather name="save" size={25} color="#fff" />
          <Text style={styles.nextButtonText}>Salvar</Text>
        </TouchableOpacity>
        
    </View>
      
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4dadc',
    
  },
  header: {
    padding:5,
    paddingHorizontal:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    marginBottom:20,
    paddingTop:15
  },
  headerText:{
    fontSize: 30,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight:20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold',
  },
  menu:{
    marginHorizontal:15,
  },
  horaTexto:{
    fontSize: 25,
    marginLeft:10,
    color: 'gray',
    marginBottom:10
  },
  horaTextoInput:{
    borderRadius:15,
    padding: 15,
    fontSize: 20,
    marginBottom: 10,
    color: 'gray',
    backgroundColor:'#fff',
  },
  nextButton: {
    flexDirection:'row',
    backgroundColor: "#1f6af7",
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