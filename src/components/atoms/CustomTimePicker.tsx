import {useCallback, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {IconButton, useTheme} from 'react-native-paper';
import {de, en, enGB, nl, registerTranslation, TimePickerModal} from "react-native-paper-dates";
import "intl";
import {Moment} from "moment";

registerTranslation('en-GB', enGB);
registerTranslation('de', de);
registerTranslation('en', en);
registerTranslation('nl', nl);

type PropType = {
    initialVisibility: boolean;
    handleConfirm: (hoursAndMinutes: {
        hours: number;
        minutes: number;
    }) => any;
    selectedTime?: Moment
}

const styles = StyleSheet.create({
    timeKeyboardContainer: {
        flex: 2,
        justifyContent: "center",
    },
    timeClockIconContainer: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center"
    }
})
export default function CustomTimePicker(props: PropType) {
    const {initialVisibility, handleConfirm, selectedTime} = props;
    const [modalIsVisible, setModalIsVisible] = useState(initialVisibility)
    const theme = useTheme();
    const currentTime = new Date();
    const [selectedHour, setSelectedHour] = useState<number>()
    const [selectedMinute, setSelectedMinute] = useState<number>()

    const handleDismiss = useCallback(() => {
        setModalIsVisible(false)
    }, [setModalIsVisible])

    useEffect(() => {
        if (selectedTime) {
            console.log(selectedTime)
            console.log(typeof selectedTime)

            console.log("hours",selectedTime.hour())
            setSelectedHour(selectedTime.hour())
            setSelectedMinute(selectedTime.minute())
        }
    }, [selectedTime])

    useEffect(() => {
        console.log(selectedMinute)
    }, [selectedMinute]);


    return (
        <>
            <View style={styles.timeKeyboardContainer}>
                <View style={styles.timeClockIconContainer}>
                    <IconButton
                        icon="clock"
                        size={70}
                        iconColor={theme.colors.onPrimary}
                        onPress={() => setModalIsVisible(true)}/>

                    <TimePickerModal visible={modalIsVisible}
                                     onDismiss={handleDismiss}
                                     onConfirm={(hoursAndMinutes) => {
                                         handleConfirm(hoursAndMinutes);
                                         setModalIsVisible(false);
                                     }}
                                     hours={selectedHour ? selectedHour : currentTime.getHours()}
                                     minutes={selectedMinute ? selectedMinute : currentTime.getMinutes()}
                                     uppercase={true}
                                     animationType={"fade"}
                    />
                </View>
            </View>
        </>
    );
}
