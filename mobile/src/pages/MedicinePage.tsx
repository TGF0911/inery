import React from 'react';
import { StyleSheet,ScrollView, View, Text, Image, TouchableOpacity  } from 'react-native';
import logoImg from '../assets/logo-medicine.png'
import {Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function MedicinePage() {

  const navigation = useNavigation();

  function navigateBack(){
    navigation.goBack()
  }

  function navigateToAlarmUpdate() {
    navigation.navigate('AlarmUpdate');
}

function navigateToHorarioPage() {
  navigation.navigate('HorarioPage');
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>Escolha o medicamento</Text>
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

   
      </ScrollView>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigateToHorarioPage()}>
            <Text style={styles.nextButtonText}>Escolher Horário</Text>
            <Feather name="arrow-right-circle" size={28} color="#fff"/>
      </TouchableOpacity>
      
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
    fontSize: 20,
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
  nextButton: {
    backgroundColor: "#008db7",
    borderRadius: 20,
    alignItems: 'center',
    height: 56,
    marginTop: 10,
    marginBottom:20,
    marginHorizontal:15,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },
})