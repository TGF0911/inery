import React from 'react';
import { StyleSheet,ScrollView, View, Text, Image, TouchableOpacity  } from 'react-native';
import logoImg from '../assets/logo-medicine.png'
import {Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function AlarmDetails() {

  const navigation = useNavigation();

  function navigateBack(){
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>Alarme</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900"/>
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
             Loratadina
           </Text>
           <Text  style={styles.remedioText}>
             Descrição:
            </Text>
            <Text style={styles.remedioText}>
             Remédio anti-alérgico
           </Text>
          </View>
        </View>

       <Text style={styles.menuText}>
          Descrição do Alarme:
        </Text>

        <Text style={styles.menuText}>
          O remédio da manhã
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
            <TouchableOpacity onPress={()=>alert('edit')}>
              <Feather name="edit" size={28} color="#37C77F"/>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={() => alert('BotaoDelete')}>
            <Text style={styles.nextButtonText}>Deletar</Text>
        </TouchableOpacity>
        
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
    justifyContent:'space-between',
    backgroundColor:'#fff',
    marginBottom:20,
    paddingTop:15
  },
  headerText:{
    fontSize: 30,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight:20
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
  menuText:{
    marginBottom:20
  },
  remedio:{
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#fff',
    padding:15,
    borderRadius:15,
    marginBottom:20,
    justifyContent:'space-around',
  },
  remedioText:{
    color:'gray'
  },
  alarme:{
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#fff',
    padding:15,
    borderRadius:15,
    marginBottom:20,
    justifyContent:'space-between',
  },
  alarmeTextGrande:{
    color:'black',
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20
  },
  alarmeTextPqno:{
    marginBottom:20
  },
  alarmeBotao:{
    height:100,
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