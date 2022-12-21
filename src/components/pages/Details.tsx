import {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button, Snackbar, TextInput, useTheme} from 'react-native-paper';
import CustomTimePicker from "../atoms/CustomTimePicker";
import WeekdayBar from "../atoms/WeekdayBar";
import RepeatBar from "../atoms/RepeatBar";
import {ReminderType} from "../../types/models/Reminders.models";
import StorageService from "../../services/StorageService";
import {WeekdayType} from "../../types/WeekDayType";


export default function Details() {
    const theme = useTheme();
    const [enteredText, setEnteredText] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(true)
    const [selectedReminder, setSelectedReminder] = useState<ReminderType>()
    const {storeData, getData} = StorageService
    const [enteredTime, setEnteredTime] = useState<string>();
    const [selectedDays, setSelectedDays] = useState<WeekdayType[]>([])
    const [selectedRepeat, setSelectedRepeat] = useState<string>("never")
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
        getData("allReminders").then((value) => {
            setAllReminders(JSON.parse(value))
        })
        })
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
            console.log(tempReminder);

            console.log(allReminders);
            allReminders.push(tempReminder);
            //todo push to correct storage (get correct storage in first term)
            storeData("allReminders", allReminders.toString()).then(() => {
                console.log("successfully pushed to reminders")
            })
        } else {
            setErrorText("Please fill out every field")
            setIsSnackbarVisible(true)
        }
    }

    const handleTimeConfirm = useCallback(({hours, minutes}) => {
        let hourString = hours.toString();
        let minuteString = minutes.toString();
        setEnteredTime(hourString + ":" + minuteString);
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
            <View style={styles.container}>
                <TextInput
                    label={"message"}
                    placeholder={"messageToShow"}
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
        </>);
}
