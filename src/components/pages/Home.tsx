import {  Card, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Reminders } from '../../types/models/Reminders.models';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { ReminderType } from '../../types/models/Reminders.models';
import weekDayEnum from '../../config/WeekDays';
import repeatEnum from '../../config/Repeat';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import styles from '../../styles/home.styles';
import EditIconButton from '../atoms/editIconButton';
import SwitchButton from '../atoms/toggleSwitch';
import { Navigate } from 'react-router-native';
import { useNavigation } from "@react-navigation/core";
import Details from './Details';



export default function Home() {
const testReminder:ReminderType = {
    id: 1,
    title: "Das ist ein Test",
    time: "12:00",
    days: [weekDayEnum.MONDAY],
    repeat: repeatEnum.DAILY_REPEAT,

   
}
}  
   const navigation = useNavigation();

    const [reminders, setRemiders] = useState<ReminderType[]>([testReminder])
    console.log(testReminder)
     isActive: true

 return (
   <View style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={require('./../../../assets/background.png')} style={{width: '100%', height: '100%'}}>
         <Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card>
         <Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card><Card onPress={()=>{navigation.navigate('Details' as never)}} style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <SwitchButton/>
         </Card>
        <StatusBar style="auto" />
        <AddNewReminderFAB/>
      </ImageBackground>
    </ScrollView>
    </View>
 )
}
