import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import api from '../service/api';

interface Patient {
  id: number;
  name: string;
  cpf: string;
  email: string;
  photo: string;
}

interface RouteParams {
  id: number;
}

export default function Profile() {

    const [patient, setPatient] = useState<Patient>()
    const route = useRoute()
    const params = route.params as RouteParams

    useEffect(()=> {
      api.get(`/patient/${params.id}`).then(({ data }) => setPatient(data))
    }, [params.id])

  return (
    <View>
      
      <Image source={{uri : patient?.photo}} />
      
    </View>
  )
}