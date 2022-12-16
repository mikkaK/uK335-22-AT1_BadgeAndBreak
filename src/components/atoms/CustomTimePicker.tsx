import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, useTheme, IconButton } from 'react-native-paper';
import { TimePicker, TimePickerModal } from "react-native-paper-dates";
import {en, de, nl, enGB, registerTranslation} from 'react-native-paper-dates'
import "intl";
registerTranslation('en-GB', enGB);
registerTranslation('de', de);
registerTranslation('en', en);
registerTranslation('nl', nl);

type PropType = {
    initialVisibility: boolean;
    handleTimeChange: () => void;
    handleConfirm: () => void;
}

const styles = StyleSheet.create({
        timeKeyboardContainer: {
        flex: 2,
        justifyContent: "center",
        //backgroundColor: "red"
    },
    timeClockIconContainer: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center"
        //backgroundColor : "blue"
    }
})
export default function CustomTimePicker (props: PropType) {
    const { initialVisibility, handleTimeChange, handleConfirm } = props;
    const [modalIsVisible, setModalIsVisible] = useState(initialVisibility)
    const theme = useTheme();
    const currentTime = new Date();
    const [enteredTime, setEnteredTime] = useState();
        const onDismiss = useCallback(() => {
        setModalIsVisible(false)
    }, [setModalIsVisible])



    return (
    <>
    <View style={styles.timeKeyboardContainer}>
    <TimePicker
        inputType={"keyboard"}
        focused={"hours"}
        onFocusInput={handleTimeChange}
        onChange={handleTimeChange}
        hours={currentTime.getHours()}
        minutes={currentTime.getMinutes()}
    />
    </View>
    <View style={styles.timeClockIconContainer}>
        <IconButton
            icon="clock"
            size={70}
            iconColor={theme.colors.onPrimary}
            onPress={() => setModalIsVisible(true)}/>
    </View>
    <TimePickerModal visible={modalIsVisible}
        onDismiss={onDismiss}
        onConfirm={handleConfirm}
        />
    </>);
}
