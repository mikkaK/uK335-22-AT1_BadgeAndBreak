import {Card, Title, TouchableRipple} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ReminderType} from '../../types/models/Reminders.models';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import {styles} from '../../styles/home.styles';
import {useTranslation} from "react-i18next";
import StorageService from "../../services/StorageService";
import SwitchButton from "../atoms/toggleSwitch";
import moment from "moment";
import SnackbarContent from "../molecules/Snackbar";

/**
 * @param navigation
 * @param route
 * @constructor
 */
export default function Home({navigation, route}) {
    const [snackbarColor, setSnackbarColor] = useState<String>();
    const [snackbarMessage, setSnackbarMessage] = useState<string>("Error")
    const {t} = useTranslation()
    const {storeData, getData} = StorageService;
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)
    const [reminders, setRemiders] = useState<ReminderType[]>([])
    const deleteMessage = t("description.deleteMessage")
    const creatMessage = t("description.created")

    function deleteReminder(reminder: ReminderType) {
        setSnackbarColor("error")
        setIsSnackbarVisible(true)
        setSnackbarMessage(deleteMessage)
        let removeIndex = [...reminders].findIndex((reminderToDelete) => reminderToDelete.id === reminder.id)
        if (removeIndex !== -1) {
            let newReminders: ReminderType[] = [...reminders].filter((reminderItem) => {
                return reminderItem.id !== reminder.id
            })
            setRemiders(newReminders)
        }
    }

    useEffect(() => {
        getData("allReminders").then((value) => setRemiders(JSON.parse(value)))
    }, [])

    useEffect(() => {
        if (route.params?.newReminder) {
            setSnackbarColor("success")
            setIsSnackbarVisible(true)
            setSnackbarMessage(creatMessage)
            let newReminder: ReminderType = route.params.newReminder;
            if (route.params.existing === false) {
                let index: number;
                if (reminders.length !== 0) {
                    let sortedReminders = [...reminders].sort((r1, r2) => (r1.id > r2.id) ? 1 : (r1.id < r2.id) ? -1 : 0)
                    index = reminders.findIndex((reminder) => reminder === sortedReminders[sortedReminders.length - 1])
                }
                newReminder.id = reminders.length !== 0 ? ++index : 0
                setRemiders([...reminders, newReminder])
            } else {
                setRemiders(reminders.map((value) => value.id === newReminder.id ? newReminder : value))
            }
            storeData("allReminders", JSON.stringify(reminders));
        }
    }, [route.params?.newReminder])

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
                                        navigation.navigate("Details", {reminder, reminders})}
                                    onLongPress={() => {
                                        deleteReminder(reminder);
                                        setIsSnackbarVisible(true)
                                    }}>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            <Title>{reminder.title} </Title>
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
                <SnackbarContent message={snackbarMessage} visibility={isSnackbarVisible}
                                 setVisibility={setIsSnackbarVisible} color={snackbarColor}/>
            </ImageBackground>
        </View>

    )
}
