import {  Card, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Reminders } from '../../types/models/Reminders.models';
import weekDayEnum from '../../config/WeekDays';
import repeatEnum from '../../config/Repeat';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import { styles } from '../../styles/home.styles';
import EditIconButton from '../atoms/editIconButton';



export default function Home() {
const testReminder:Reminders = {
    title: "Das ist ein Test",
    time: "12:00",
    days: weekDayEnum.MONDAY,
    repeat: repeatEnum.DAILY_REPEAT,
}
    const [reminders, setRemiders] = useState<Reminders[]>([testReminder])
    console.log(testReminder)
    
 return (
    <View style={styles.container}>
      <ImageBackground source={require('./../../../assets/background.png')} style={{width: '100%', height: '100%'}}>
         <Card style={styles.card}>
            <Card.Title title={testReminder.title}>
          </Card.Title>
          <EditIconButton/>
         </Card>
        <StatusBar style="auto" />
        <AddNewReminderFAB/>
      </ImageBackground>
    </View>
 ) 
}