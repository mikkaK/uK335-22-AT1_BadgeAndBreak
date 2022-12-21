import {Card, Snackbar, Title, TouchableRipple,useTheme} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ReminderType} from '../../types/models/Reminders.models';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import {styles} from '../../styles/home.styles';
import {useTranslation} from "react-i18next";
import StorageService from "../../services/StorageService";
import SwitchButton from "../atoms/toggleSwitch";
import moment, {Moment} from "moment";
import {useIsFocused} from "@react-navigation/native";
import SnackbarContent from "../molecules/Snackbar";


export default function Home({navigation}) {
    const {t} = useTranslation()
    const theme = useTheme();
    const {storeData, getData } = StorageService;
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)
    const [reminders, setRemiders] = useState<ReminderType[]>()
    const isFocused = useIsFocused();

    function deleteReminder(reminder: ReminderType) {
        setRemiders(reminders.filter((reminderToDelete)=> reminderToDelete.id !== reminder.id))
        storeData("allReminders", JSON.stringify(reminder));
    }

    useEffect(() => {
        getData("allReminders").then(value => {
            setRemiders(JSON.parse(value))
            console.log("reminders on homepage", reminders.flat())
        })

    }, [isFocused])
    return (

        <View style={styles.container}>
            <ImageBackground source={require('./../../../assets/background.png')}
                             style={{width: '100%', height: '100%'}}>
                <ScrollView style={styles.scrollView}>
                    {reminders !== undefined && reminders.length !== 0 ?
                        <>
                        {reminders.map(reminder => (
                            <TouchableRipple
                                onPress={() =>
                                    navigation.navigate("Details",{reminder,reminders})}
                                onLongPress={() => { deleteReminder(reminder), setIsSnackbarVisible(true)}}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Title>{reminder.title}</Title>
                                    <Text>{t("description.time")} {moment(reminder.time).format("HH:mm")}, {t("description." + reminder.repeat)}</Text>
                                </Card.Content>
                                <SwitchButton/>

                            </Card>

                            </TouchableRipple>
                        ))}
                        </>
                        :
                        <>
                        </>
                    }
                </ScrollView>
                <StatusBar style="auto"/>
                <View style={styles.FABContainer}>
                    <AddNewReminderFAB navigation={navigation} reminders={reminders}/>
                </View>
                <SnackbarContent message={ t("description.deleteMessage")} visibility={isSnackbarVisible} setVisibility={setIsSnackbarVisible}/>
            </ImageBackground>
        </View>

    )
}
