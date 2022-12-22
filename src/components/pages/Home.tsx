import {Card, Title, TouchableRipple, useTheme} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {ReminderType} from '../../types/models/Reminders.models';
import AddNewReminderFAB from '../atoms/addNewReminderFAB';
import {styles} from '../../styles/home.styles';
import {useTranslation} from "react-i18next";
import StorageService from "../../services/StorageService";
import SwitchButton from "../atoms/toggleSwitch";
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";
import SnackbarContent from "../molecules/Snackbar";
 /**
 * @param navigation
 * @constructor
 */
export default function Home({navigation, route}) {

    const {t} = useTranslation()
    const theme = useTheme();
    const {storeData, getData} = StorageService;
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)
    const [reminders, setRemiders] = useState<ReminderType[]>([])
    function deleteReminder(reminder: ReminderType) {
        let removeIndex = [...reminders].findIndex((reminderToDelete) => reminderToDelete.id === reminder.id)
        console.log("indexToRemove", removeIndex);
        if (removeIndex !== -1){
            let newReminders:ReminderType[] = [...reminders].filter((reminderItem) => {
                return reminderItem.id !== reminder.id
            })
          setRemiders(newReminders)
        }
    }
    const isFocused = useIsFocused();

    /*useEffect(() => {
        getData("allReminders").then(value => {
            console.log("unparsed value from isFocused useEffect", value)
            setRemiders(JSON.parse(value))
        }).then(() => {
            console.log("reminders variable after isFocused useEffect", reminders)
        })
        console.log("reminders on homepage", reminders)
    }, [isFocused]) */

    useEffect(() => {
        console.log("Entered useEffect")
        if (route.params?.newReminder){
            let newReminder:ReminderType = route.params.newReminder;
            console.log(route.params.existing)
            if (route.params.existing === false) {
                let index: number;
                if (reminders.length !== 0) {
                    let sortedReminders = [...reminders].sort((r1, r2) => (r1.id > r2.id) ? 1 : (r1.id < r2.id) ? -1 : 0)
                    index = reminders.findIndex((reminder) => reminder === sortedReminders[sortedReminders.length - 1])
                }
                newReminder.id = reminders.length !== 0 ? ++index : 0
                setRemiders([...reminders, newReminder])
                console.log("set reminders", reminders)
            }else{
                setRemiders(reminders.map((value) => value.id === newReminder.id ? newReminder : value))
            }
        }
    },[route.params?.newReminder])

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
                                        navigation.navigate("Details",{reminder, reminders})}
                                    onLongPress={() => {
                                        deleteReminder(reminder), setIsSnackbarVisible(true)
                                    }}>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            <Title>{reminder.id}</Title>
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
                <SnackbarContent message={t("description.deleteMessage")} visibility={isSnackbarVisible}
                                 setVisibility={setIsSnackbarVisible}/>
            </ImageBackground>
        </View>

    )
}
