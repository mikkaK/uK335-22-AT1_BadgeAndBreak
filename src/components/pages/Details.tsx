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

export default function Details({navigation, route}) {
    const theme = useTheme();
    const [enteredText, setEnteredText] = useState(route.params.reminder ? route.params.reminder.title : "");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)
    const [selectedReminder, setSelectedReminder] = useState<ReminderType>(route.params.reminder ? route.params.reminder : {} as ReminderType)
    const [enteredTime, setEnteredTime] = useState<Moment>();
    const [selectedDays, setSelectedDays] = useState<WeekdayType[]>([])
    const [selectedRepeat, setSelectedRepeat] = useState<string>("never")
    const [snackbarMessage,setSnackbarMessage] = useState<string>("Error")
    const {t} = useTranslation()
    const [errorText, setErrorText] = useState<string>("An undefined error occurred")
    const [allReminders, setAllReminders] = useState<ReminderType[]>()
    const {storeData, getData} = StorageService;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.primary,
            marginBottom: "5%",
            marginRight: "5%",
            marginLeft: "5%",
        },
        clockContainer: {
            flex: 3,
            justifyContent: "center",
            alignItems: "center"
        },
        snackbarContainer: {
            flex: 1.5,
            backgroundColor: "transparent"
        },
        saveContainer: {
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
        },
        saveButton: {
            minWidth: "50%"
        },
        snackbar: {}
    })


    useEffect(() => {
        if (route.params.reminder) {
            setSelectedReminder(route.params.reminder)
        }
        setAllReminders(route.params.reminders)

    }, [])

    const handleSave = () => {
        const sortedReminders = [...allReminders].sort((r1, r2) => (r1.id < r2.id) ? 1 : (r1.id > r2.id) ? -1 : 0)
        console.log("sorted reminders", sortedReminders)
        let idOfLastIndex = sortedReminders[0].id
        console.log("highest id", idOfLastIndex)
        if (selectedDays.length && enteredText && enteredTime) {
            setIsSnackbarVisible(false)
            const tempReminder: ReminderType = {
                days: selectedDays,
                repeat: selectedRepeat,
                isActive: true,
                id: ++idOfLastIndex,
                time: enteredTime,
                title: enteredText
            }
            storeData("allReminders", JSON.stringify([...allReminders, tempReminder])).then(() =>  navigation.navigate("Home"));

        } else {
            setErrorText("Please fill out every field")
            setIsSnackbarVisible(true)
        }
    }
    useEffect(() => {
        console.log(allReminders);
    }, [allReminders])

    const handleTimeConfirm = useCallback(({hours, minutes}) => {
        const time = moment();
        time.hours(hours)
        time.minutes(minutes)
        setEnteredTime(time);
    }, [enteredTime])//maybe remove input

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
