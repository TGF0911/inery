import React, { useState } from 'react';
import { View } from 'react-native';

interface Alarm {
  id : number;
  hour: number;
  week_days : Array<{
    id: number;
    week_day : number;
  }>
}

export default function AlarmPage() {

  const [alarm, setAlarm] = useState<Alarm>()

  async function sendIot(hour : number){
    
  }

  return (
    <View>

    </View>
  )
}