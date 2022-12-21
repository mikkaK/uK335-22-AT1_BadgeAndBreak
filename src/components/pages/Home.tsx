import {Card, Paragraph, Title} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ReminderType} from '../../types/models/Reminders.models';
import weekDayEnum from '../../config/WeekDays';
import repeatEnum from '../../config/Repeat';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import {styles} from '../../styles/home.styles';
import EditIconButton from '../atoms/editIconButton';
import {useTranslation} from "react-i18next";
import {NativeRouter} from "react-router-native";
import StorageService from "../../services/StorageService";


export default function Home({navigation}) {
    const {t} = useTranslation()
    const {storeData, getData} = StorageService;
    const [reminders, setRemiders] = useState<ReminderType[]>([
        {
            id: 1,
            title: "Das ist ein Test",
            time: "12:00",
            days: [weekDayEnum.MONDAY],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 2,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [weekDayEnum.TUESDAY],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 3,
            title: "Das ist ein Test",
            time: "12:00",
            days: [weekDayEnum.MONDAY],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 4,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [weekDayEnum.TUESDAY],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 5,
            title: "Das ist ein Test",
            time: "12:00",
            days: [weekDayEnum.MONDAY],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 6,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [weekDayEnum.TUESDAY],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 7,
            title: "Das ist ein Test",
            time: "12:00",
            days: [weekDayEnum.MONDAY],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 8,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [weekDayEnum.TUESDAY],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        }
        , {
            id: 6,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [weekDayEnum.TUESDAY],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 7,
            title: "Das ist ein Test",
            time: "12:00",
            days: [weekDayEnum.MONDAY],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 8,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [weekDayEnum.TUESDAY],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        }
        , {
            id: 6,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [weekDayEnum.TUESDAY],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        }
    ])

    useEffect(()=>{
        if(reminders.length === 0){
            setRemiders([])
        }else {
            storeData("allReminders", reminders.toString())
        }
    }, [])

    return (

        <View style={styles.container}>
            <ImageBackground source={require('./../../../assets/background.png')}
                             style={{width: '100%', height: '100%'}}>
                <ScrollView style={styles.scrollView}>
                        {reminders.map(reminders => (
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Title>{reminders.title}</Title>
                                    <Text>Zeit: {reminders.time}, {reminders.repeat}</Text>
                                </Card.Content>
                                <EditIconButton/>
                            </Card>
                        ))}
                </ScrollView>
                <StatusBar style="auto"/>
                <View style={styles.FABContainer}>
                <AddNewReminderFAB navigation={navigation}/>
                </View>
            </ImageBackground>
        </View>

    )
}
