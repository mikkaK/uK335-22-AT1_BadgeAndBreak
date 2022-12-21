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
import {json} from "react-router-native";
import {useTranslation} from "react-i18next";


export default function Details({navigation, route}) {
    const theme = useTheme();
    const [enteredText, setEnteredText] = useState(route.params.reminder ? route.params.reminder.title : "");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)
    const [selectedReminder, setSelectedReminder] = useState<ReminderType>(route.params.reminder ? route.params.reminder : {} as ReminderType)
    const {storeData, getData} = StorageService
    const [enteredTime, setEnteredTime] = useState<Moment>();
    const [selectedDays, setSelectedDays] = useState<WeekdayType[]>([])
    const [selectedRepeat, setSelectedRepeat] = useState<string>("never")
    const {t} = useTranslation()
    const [errorText, setErrorText] = useState<string>("An undefined error occurred")
    const [allReminders, setAllReminders] = useState<ReminderType[]>()
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
        if (selectedDays.length && enteredText && enteredTime) {
            setIsSnackbarVisible(false)
            const tempReminder: ReminderType = {
                days: selectedDays,
                repeat: selectedRepeat,
                isActive: true,
                id: 1,
                time: enteredTime,
                title: enteredText
            }
            setAllReminders([...allReminders, tempReminder]);
            storeData("allReminders", JSON.stringify(allReminders)).then(() => {
                navigation.navigate("Home")
            });
        } else {
            setErrorText("Please fill out every field")
            setIsSnackbarVisible(true)
        }
    }
    useEffect(() => {
        console.log(allReminders);
    },[allReminders])

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
                />
            </View>
            <View style={[styles.container, styles.clockContainer]}>
                <CustomTimePicker initialVisibility={false}
                                  handleConfirm={handleTimeConfirm}
                />
            </View>
            <View style={styles.container}>
                <WeekdayBar handleStateChange={handleWeekdayPress}/>
            </View>
            <View style={styles.container}>
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
                <View style={styles.container}>
                    <TextInput
                        label={"message"}
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
                    <WeekdayBar handleStateChange={handleWeekdayPress} selectedValues={selectedReminder.days}/>
                </View>
                <View style={styles.container}>
                    <RepeatBar handleChange={handleRepeatChange} selectedValue={selectedReminder.repeat}/>
                </View>
                <View style={[styles.container, styles.saveContainer]}>
                    <Button mode={"contained"} style={styles.saveButton} onPress={() => {
                        handleSave();
                    }}>
                        <Text style={{width: "90%"}}>Save</Text>
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
                        <Text style={{color: theme.colors.onError}}>{errorText}</Text>
                    </Snackbar>
                </View>
            </ImageBackground>
        </>);
}
