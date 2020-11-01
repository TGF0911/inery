import React, { useEffect, useState } from 'react';
import { StyleSheet,TextInput, View, ScrollView, Text,  TouchableOpacity, } from 'react-native';
import {Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';
import { CheckBox } from 'react-native-elements'

interface Alarm {
  id: number;
  hour: number;
}

interface RouteParams {
  id: number;
}

export default function AlarmUpdate() {

  
  const [domingo, onChangeDomingo]=React.useState(false);
  const [segunda, onChangeSegunda]=React.useState(false);
  const [terca, onChangeTerca]=React.useState(false);
  const [quarta, onChangeQuarta]=React.useState(false);
  const [quinta, onChangeQuinta]=React.useState(false);
  const [sexta, onChangeSexta]=React.useState(false);
  const [sabado, onChangeSabado]=React.useState(false);
  
  
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
  const [value, onChangeText] = React.useState('');
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Alterar alarme</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900"/>
        </TouchableOpacity>
     
      </View>
      <ScrollView style={styles.menu}>
        <Text style={styles.horaTexto}>Hora(HH:MM):</Text>
        <TextInput
          style={styles.horaTextoInput}
          onChangeText={text => onChangeText(text)}
          value={value}/>
        <Text style={styles.horaTexto}>Dia da Semana:</Text>  
        <CheckBox
          checked={domingo}
          center
          title='Domingo'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => onChangeDomingo(!domingo)}
        />
        <CheckBox
          checked={segunda}
          center
          title='Segunda-Feira'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => onChangeSegunda(!segunda)}
        /> 
        <CheckBox
          checked={terca}
          center
          title='Terça-Feira'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => onChangeTerca(!terca)}
        /> 
        <CheckBox
          checked={quarta}
          center
          title='Quarta-Feira'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => onChangeQuarta(!quarta)}
        /> 
        <CheckBox
          checked={quinta}
          center
          title='Quinta-Feira'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => onChangeQuinta(!quinta)}
        /> 
        <CheckBox
          checked={sexta}
          center
          title='Sexta-Feira'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => onChangeSexta(!sexta)}
        /> 
        <CheckBox
          checked={sabado}
          center
          title='Sábado'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => onChangeSabado(!sabado)}
        /> 
        
        <TouchableOpacity style={styles.nextButton} onPress={handleUpdateAlarm}>
        <Feather name="save" size={25} color="#fff" />
          <Text style={styles.nextButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
        
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