import {  Card, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { ReminderType } from '../../types/models/Reminders.models';
import weekDayEnum from '../../config/WeekDays';
import repeatEnum from '../../config/Repeat';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import { styles } from '../../styles/home.styles';
import EditIconButton from '../atoms/editIconButton';
import {useTranslation} from "react-i18next";



export default function Home() {
    const {t} = useTranslation()
const testReminder:ReminderType = {
    id: 1,
    title: "Das ist ein Test",
    time: "12:00",
    days: [weekDayEnum.MONDAY],
    repeat: repeatEnum.DAILY_REPEAT,
    isActive: true
}
    const [reminders, setRemiders] = useState<ReminderType[]>([testReminder])
    console.log(testReminder)

 return (
    <View style={styles.container}>
        <Text>{t("yourReminders")}</Text>
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
