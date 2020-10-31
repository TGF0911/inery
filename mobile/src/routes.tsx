import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
// import {createStackNavigator} from '@react-navigation/stack'
import CustomOnboarding from './pages/Onboarding';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MedicinePage from './pages/MedicinePage';
import AlarmDetails from './pages/AlarmDetails';
import AlarmUpdate from './pages/AlarmUpdate';
import HorarioPage from './pages/HorarioPage';

const {Navigator, Screen} = createDrawerNavigator()
// const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Landing">
        <Screen name="Landing" component={CustomOnboarding} />
        <Screen name="LoginPage" component={LoginPage}/>
        <Screen name="HomePage" component={HomePage} />
        <Screen name="MedicinePage" component={MedicinePage} />
        <Screen name="AlarmDetails" component={AlarmDetails} />
        <Screen name="AlarmUpdate" component={AlarmUpdate} />
        <Screen name="HorarioPage" component={HorarioPage}/>
      </Navigator>
    </NavigationContainer>
  )
}