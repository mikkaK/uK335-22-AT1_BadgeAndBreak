import {useCallback, useEffect, useState} from "react";
import {View} from "react-native";
import {IconButton, useTheme} from 'react-native-paper';
import {de, en, registerTranslation, TimePickerModal} from "react-native-paper-dates";
import "intl";
import moment, {Moment} from "moment";

import {useTranslation} from "react-i18next";
import {styles} from "../../styles/timePicker.styles"

registerTranslation('de', de);
registerTranslation('en', en);

type PropType = {
    initialVisibility: boolean;
    handleConfirm: (hoursAndMinutes: {
        hours: number;
        minutes: number;
    }) => any;
    selectedTime?: Moment
}
/**
 *
 * @param props (initialVisibility: sets the initial visibility of the modal,
 *               handleConfirm: callBack function for passing the selected values to the Detailspage,
 *               selectedTime: optional attribute for passing a preselected value to the component)
 * @constructor
 * This component is used in the detail page to pick the desired trigger time of a reminder
 */

export default function CustomTimePicker(props: PropType) {
    const {initialVisibility, handleConfirm, selectedTime} = props;
    const [modalIsVisible, setModalIsVisible] = useState(initialVisibility)
    const theme = useTheme();
    const currentTime = new Date();
    const {t} = useTranslation()
    const [selectedHour, setSelectedHour] = useState<number>()
    const [selectedMinute, setSelectedMinute] = useState<number>()

    const handleDismiss = useCallback(() => {
        setModalIsVisible(false)
    }, [setModalIsVisible])

    useEffect(() => {
        if (selectedTime) {
            const parsedTime: Moment = moment(selectedTime);
            setSelectedHour(parsedTime.hour())
            setSelectedMinute(parsedTime.minute())
        }
    }, [selectedTime])

    useEffect(() => {

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
                                     label={t("description.enterTimeClock")}
                                     cancelLabel={t("description.cancel")}
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
