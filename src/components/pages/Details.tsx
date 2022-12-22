import {useCallback, useEffect, useState} from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Button, Snackbar, TextInput, useTheme} from 'react-native-paper';
import CustomTimePicker from "../atoms/CustomTimePicker";
import WeekdayBar from "../atoms/WeekdayBar";
import RepeatBar from "../atoms/RepeatBar";
import {ReminderType} from "../../types/models/Reminders.models";
import StorageService from "../../services/StorageService";
import {WeekdayType} from "../../types/WeekDayType";
import moment, {Moment} from "moment";
import {useTranslation} from "react-i18next";
import SnackbarContent from "../molecules/Snackbar";
import {styles} from '../../styles/detail.styles';
type PropType = {
    navigation,
    route,
}
export default function Details(props:PropType) {
    const {navigation, route} = props
    const {reminder, reminders} = route.params;

    const theme = useTheme();
    const [enteredText, setEnteredText] = useState(reminder ? reminder.title : "");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)
    const [selectedReminder, setSelectedReminder] = useState<ReminderType>(reminder ? reminder : {} as ReminderType)
    const [enteredTime, setEnteredTime] = useState<Moment>();
    const [selectedDays, setSelectedDays] = useState<WeekdayType[]>([])
    const [selectedRepeat, setSelectedRepeat] = useState<string>("never")
    const [snackbarMessage, setSnackbarMessage] = useState<string>("Error")
    const {t} = useTranslation()
    const bgStyles = StyleSheet.create({
        background:{
            backgroundColor: theme.colors.primary
        }

    })


    useEffect(() => {
        console.log("reminders before useEffect", allReminders)
        if (reminder) {
            setSelectedReminder(reminder)
        }
        console.log("params", reminders)
        setAllReminders(reminders)
        console.log("reminders at end of useEffect", allReminders)
    }, [])

    const handleSave = () => {

        //todo fix spread operator error
        if (selectedDays.length && enteredText && enteredTime) {
            setIsSnackbarVisible(false)
            const tempReminder: ReminderType = {
                days: selectedDays,
                repeat: selectedRepeat,
                isActive: true,
                id: 0,
                time: enteredTime,
                title: enteredText
            }
            /*
            if (Array.isArray(allReminders)) {
                storeData("allReminders", JSON.stringify([...allReminders, tempReminder])).then(() => navigation.navigate("Home"));
            } */
            navigation.navigate({
                name: "Home",
                params: { newReminder: tempReminder},
                merge: true
            })
        } else {
            setErrorText("Please fill out every field")
            setIsSnackbarVisible(true)
        }
    }

    const handleTimeConfirm = useCallback(({hours, minutes}) => {
        const time = moment();
        time.hours(hours)
        time.minutes(minutes)
        setEnteredTime(time);
    }, [enteredTime])

    const handleWeekdayPress = useCallback((item: WeekdayType) => {
        let selectedDaysCopy = [...selectedDays];
        const {isSelected, value} = item;
        if (isSelected) {
            selectedDaysCopy.push(item)
        } else {
            selectedDaysCopy = selectedDaysCopy.filter(day => day.value !== value)
        }
        setSelectedDays(selectedDaysCopy);
    }, [selectedDays])

    const handleRepeatChange = useCallback((value) => {
        setSelectedRepeat(value)
    }, [selectedRepeat])

    return (
        <>
            <ImageBackground source={require('./../../../assets/background.png')}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <TextInput
                        label={t("description.label")}
                        placeholder={t("description.placeholderTextFiled")}
                        onChangeText={text => setEnteredText(text)}
                        mode={'flat'}
                        theme={theme}
                        style={{height: "100%"}}
                        defaultValue={enteredText}
                    />
                </View>
                <View style={[styles.container, styles.clockContainer]}>
                    <CustomTimePicker initialVisibility={false}
                                      handleConfirm={handleTimeConfirm}
                                      selectedTime={selectedReminder.time}
                    />
                </View>
                <View style={styles.container}>
                    <WeekdayBar handleStateChange={handleWeekdayPress}
                                selectedValues={selectedReminder.days}/>
                </View>
                <View style={styles.container}>
                    <RepeatBar handleChange={handleRepeatChange}
                               selectedValue={selectedReminder.repeat}/>
                </View>
                <View style={[styles.container, styles.saveContainer]}>
                    <Button mode={"contained"} style={styles.saveButton} onPress={() => {
                        handleSave()
                    }}>
                        <Text style={{width: "90%"}}>{t("description.save")}</Text>
                    </Button>
                </View>
                <View style={[styles.container, styles.snackbarContainer]}>
                    <SnackbarContent message={snackbarMessage} visibility={isSnackbarVisible}
                                     setVisibility={
                                         setIsSnackbarVisible}/>
                </View>
            </ImageBackground>
        </>);
}
