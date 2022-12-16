import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, useTheme, IconButton } from 'react-native-paper';
import { TimePicker, TimePickerModal } from "react-native-paper-dates";
import CustomTimePicker from "../components/CustomTimePicker";

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: "gray",
        marginBottom : "5%",
        marginRight : "5%",
        marginLeft : "5%",
    },
    clockContainer: {
        flex : 3,
        justifyContent: "center",
        alignItems: "center"
    },
    snackbarContainer: {
        flex: 1.5
    }
})


export default function Details() {
    const theme = useTheme();
    const [text, setText] = useState("");
    const [pickedValue, setPickedValue] = useState(new Date())
    const [modalIsVisble, setModalIsVisible] = useState(false);
    const handleTimeChange = () => {

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
     style={{height:"100%" }}
     />
 </View>
 <View style={[styles.container, styles.clockContainer]}>
    <CustomTimePicker handleConfirm={handleTimeChange} initialVisibility={false} handleTimeChange={handleTimeChange}/>
 </View>
 <View style={styles.container}>
     
 </View>
 <View style={styles.container}>

 </View>
 <View style={styles.container}>

 </View>
 <View style={[styles.container, styles.snackbarContainer]}>

 </View>
 </>);
}
