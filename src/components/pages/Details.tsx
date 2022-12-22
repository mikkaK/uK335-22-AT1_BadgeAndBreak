import {useCallback, useEffect, useState} from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Button, Snackbar, TextInput, useTheme} from 'react-native-paper';
import CustomTimePicker from "../atoms/CustomTimePicker";
import WeekdayBar from "../atoms/WeekdayBar";
import RepeatBar from "../atoms/RepeatBar";
import {ReminderType} from "../../types/models/Reminders.models";
import StorageService from "../../services/StorageService";
import {WeekdayType} from "../../types/WeekDayType";
import {useTranslation} from "react-i18next";
import {styles} from '../../styles/detail.styles';


export default function Details() {
    const theme = useTheme();
    const [enteredText, setEnteredText] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(true)
    const [selectedReminder, setSelectedReminder] = useState<ReminderType>()
    const {storeData, getData} = StorageService
    const [enteredTime, setEnteredTime] = useState<string>();
    const [selectedDays, setSelectedDays ] = useState<WeekdayType[]> ([])
    const [selectedRepeat, setSelectedRepeat] = useState<string>("never")
    const {t} = useTranslation()


    const bgStyles = StyleSheet.create({
        background:{
            backgroundColor: theme.colors.primary
        }
    })


    useEffect(() => {
        getData("selectedReminder").then((value) => {
            if (value === undefined || value === null) {
                setSelectedReminder({
                        days: [],
                        id: 0,
                        isActive: true,
                        repeat: undefined,
                        time: "",
                        title: ""
                    }
                )
            }
            //todo set fields to previous values when in "edit mode"
            setSelectedReminder(JSON.parse(value))
        })
    }, [])

    const handleSave = () => {
        let allReminders:ReminderType[] = [];
        getData("allReminders").then((value) => {
            console.log(value + "AllReminders")
                allReminders = JSON.parse(value);
        })
        const tempReminder: ReminderType = {
            days: selectedDays,
            repeat: selectedRepeat,
            isActive: true,
            id: 1,
            time: enteredTime,
            title: enteredText
        }
        console.log(tempReminder);
        //todo error handling and validity checks
        console.log(allReminders);
        allReminders.push(tempReminder);
        //todo push to correct storage (get correct storage in first line)
        storeData("allReminders", allReminders.toString()).then(() => {
            console.log("successfully pushed to reminders")
        });
    }

    const handleTimeConfirm = useCallback(({hours, minutes}) => {
        let hourString = hours.toString();
        let minuteString = minutes.toString();
        setEnteredTime(hourString+":"+minuteString);
        },[enteredTime])//maybe remove input

    const handleWeekdayPress = useCallback((item:WeekdayType) => {
        let selectedDaysCopy = [...selectedDays];
        const { isSelected, value } = item;
       if (isSelected){
           selectedDaysCopy.push(item)
       }else{
           selectedDaysCopy = selectedDaysCopy.filter(day => day.value !== value)
       }
        setSelectedDays(selectedDaysCopy);
    }, [selectedDays])

    const handleRepeatChange = useCallback((value) => {
        setSelectedRepeat(value)
    },[selectedRepeat])

    return (
        <>
            <ImageBackground source={require('./../../../assets/background.png')}
                             style={{width: '100%', height: '100%'}}>

            <View style={[styles.container,bgStyles.background]}>
                <TextInput
                    label={t("description.label")}
                    placeholder={t("description.placeholderTextFiled")}
                    onChangeText={text => setEnteredText(text)}
                    mode={'flat'}
                    theme={theme}
                    style={{height: "100%"}}
                />
            </View>
            <View style={[styles.container, styles.clockContainer,bgStyles.background]}>
                <CustomTimePicker initialVisibility={false}
                                  handleConfirm={handleTimeConfirm}
                />
            </View>
            <View style={[styles.container,bgStyles.background]}>
                <WeekdayBar handleStateChange={handleWeekdayPress}/>
            </View>
            <View style={[styles.container,bgStyles.background]}>
                <RepeatBar handleChange={handleRepeatChange}/>
            </View>
            <View style={[styles.container, styles.saveContainer]}>
                <Button mode={"contained"} style={styles.saveButton} onPress={handleSave}>
                    <Text style={{width: "90%"}}>{t("description.save")}</Text>
                </Button>
            </View>
            <View style={[styles.container, styles.snackbarContainer]}>
                <Snackbar
                    visible={isSnackbarVisible}
                    onDismiss={() => {
                        setIsSnackbarVisible(false)
                    }}
                    style={{backgroundColor: theme.colors.error}}
                >
                    <Text style={{color: theme.colors.onError}}>Error</Text>
                </Snackbar>
            </View>
            </ImageBackground>
        </>);
}
