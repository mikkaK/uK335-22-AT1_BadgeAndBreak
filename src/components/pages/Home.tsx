import {Card, Title, TouchableRipple} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ReminderType} from '../../types/models/Reminders.models';
import weekDayEnum from '../../config/WeekDays';
import repeatEnum from '../../config/Repeat';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import {styles} from '../../styles/home.styles';
import {useTranslation} from "react-i18next";
import StorageService from "../../services/StorageService";
import SwitchButton from "../atoms/toggleSwitch";


export default function Home({navigation}) {
    const {t} = useTranslation()
    const {storeData, getData} = StorageService;
    const [reminders, setRemiders] = useState<ReminderType[]>([
        {
            id: 1,
            title: "Das ist ein Test",
            time: "12:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true,
        }, {
            id: 2,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 3,
            title: "Das ist ein Test",
            time: "12:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 4,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 5,
            title: "Das ist ein Test",
            time: "12:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 6,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 7,
            title: "Das ist ein Test",
            time: "12:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 8,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        }
        , {
            id: 6,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        },
        {
            id: 7,
            title: "Das ist ein Test",
            time: "12:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.DAILY_REPEAT,
            isActive: true
        }, {
            id: 8,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
            repeat: repeatEnum.WEEKLY_REPEAT,
            isActive: false
        }
        , {
            id: 6,
            title: "Das ist noch ein Test",
            time: "13:00",
            days: [{value:weekDayEnum.MONDAY,isSelected:true}],
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
                        {reminders.map(reminder => (
                            <TouchableRipple
                                onPress={() =>
                                    navigation.navigate("Details",{reminder,reminders})}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Title>{reminder.id}</Title>
                                    <Text>Zeit: {reminder.time}, {reminder.repeat}</Text>
                                </Card.Content>
                                <SwitchButton/>
                            </Card>
                            </TouchableRipple>
                        ))}
                </ScrollView>
                <StatusBar style="auto"/>
                <View style={styles.FABContainer}>
                <AddNewReminderFAB navigation={navigation} reminders={reminders}/>
                </View>
            </ImageBackground>
        </View>

    )
}
