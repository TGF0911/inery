import React, { useState } from 'react';
import { StyleSheet,TextInput, View, Text,  TouchableOpacity, FlatList  } from 'react-native';
import {Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const semana = [
  {
    id: '1',
    title: 'Domingo',
  },
  {
    id: '2',
    title: 'Segunda-Feira',
  },
  {
    id: '3',
    title: 'Terça-Feira',
  },
  {
    id: '4',
    title: 'Quarta-Feira',
  },
  {
    id: '5',
    title: 'Quinta-Feira',
  },
  {
    id: '6',
    title: 'Sexta-Feora',
  },
  {
    id: '7',
    title: 'Sábado',
  },
];

export default function AlarmUpdate() {

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
      <View style={styles.menu}>
        <Text style={styles.horaTexto}>Hora(HH:MM):</Text>
        <TextInput
          style={styles.horaTextoInput}
          onChangeText={text => onChangeText(text)}
          value={value}/>
        
        <TouchableOpacity style={styles.nextButton} onPress={() => alert('BotaoCadastrar')}>
          <Text style={styles.nextButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
        
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