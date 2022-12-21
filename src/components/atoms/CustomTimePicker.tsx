import {useCallback, useState} from "react";
import {View, StyleSheet} from "react-native";
import { useTheme, IconButton} from 'react-native-paper';
import { TimePickerModal, en, de, nl, enGB, registerTranslation} from "react-native-paper-dates";
import "intl";
import {useTranslation} from "react-i18next";

registerTranslation('de', de);
registerTranslation('en', en);

type PropType = {
    initialVisibility: boolean;
    handleConfirm: (hoursAndMinutes: {
        hours: number;
        minutes: number;
    }) => any;
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
/**
 *
 * @param props
 * @constructor
 */
export default function CustomTimePicker(props: PropType) {
    const {initialVisibility, handleConfirm} = props;
    const [modalIsVisible, setModalIsVisible] = useState(initialVisibility)
    const theme = useTheme();
    const currentTime = new Date();
    const {t} = useTranslation()

    const handleDismiss = useCallback(() => {
        setModalIsVisible(false)
    }, [setModalIsVisible])


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
                                     cancelLabel = {t("description.cancel")}
                                     hours={currentTime.getHours()}
                                     minutes={currentTime.getMinutes()}
                                     uppercase={true}
                                     animationType={"fade"}
                    />
                </View>
            </View>
        </>
    );
}
