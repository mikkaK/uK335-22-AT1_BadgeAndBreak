import {useEffect, useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import {Button, Snackbar, TextInput, useTheme} from 'react-native-paper';
import CustomTimePicker from "../atoms/CustomTimePicker";
import WeekdayBar from "../atoms/WeekdayBar";
import RepeatBar from "../atoms/RepeatBar";
import {ReminderType} from "../../types/models/Reminders.models";
import StorageService from "../../services/StorageService";
import weekDayEnum from "../../config/WeekDays";
import {WeekdayType} from "../../types/WeekDayType";
import Repeat from "../../config/Repeat";
import useThenable from "@react-navigation/native/lib/typescript/src/useThenable";


export default function Details() {
    const theme = useTheme();
    const [text, setText] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(true)
    const [selectedReminder, setSelectedReminder] = useState<ReminderType>()
    const {storeData, getData} = StorageService

    useEffect(() => {
        getData("selectedReminder").then((value) => {
            if (value === undefined || value === null){
                setSelectedReminder({
                    days: [],
                    id: 0,
                    isActive: true,
                    repeat: undefined,
                    time: "",
                    title: ""}
                )
            }
            setSelectedReminder(JSON.parse(value))
        })
    }, [])

    const handleSave = () => {
        let tempDays:WeekdayType[] = undefined
        let tempRepeat:string = undefined
        let tempTime:string = undefined
        getData("tempDays").then((value) => {
            if (valueIsPresent(value)) {
                tempDays = JSON.parse(value)
            }
        })
        getData("tempRepeat").then((value) => {
            if (valueIsPresent(value)) {
                tempRepeat = value
            }
        })
        getData("tempTime").then((value) => {
            if (valueIsPresent(value)){
                tempTime = value
            }
        })
        const tempReminder:ReminderType = {
            days : tempDays,
            repeat : tempRepeat,
            isActive: true,
            id: undefined,
            time: tempTime,
            title: text
            //todo get time from timepicker in Date format for notification service
        }
    }

    const valueIsPresent = (value:string) : boolean => {
            if (value !== null || value !== undefined){
                return true
            }
            return false
        }

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

    const handleTimeChange = () => {
        return null;
    }

    return (
        <>
                <View style={styles.container}>
                    <TextInput
                        label={"message"}
                        placeholder={"messageToShow"}
                        onChangeText={text => setText(text)}
                        mode={'flat'}
                        theme={theme}
                        style={{height: "100%"}}
                    />
                </View>
                <View style={[styles.container, styles.clockContainer]}>
                    <CustomTimePicker handleConfirm={handleTimeChange} initialVisibility={false}
                                      handleTimeChange={handleTimeChange}/>
                </View>
                <View style={styles.container}>
                    <WeekdayBar/>
                </View>
                <View style={styles.container}>
                    <RepeatBar/>
                </View>
                <View style={[styles.container, styles.saveContainer]}>
                    <Button mode={"contained"} style={styles.saveButton} onPress={() => setIsSnackbarVisible(true)}>
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
                        <Text style={{color: theme.colors.onError}}>Error</Text>
                    </Snackbar>
                </View>
        </>);
}
