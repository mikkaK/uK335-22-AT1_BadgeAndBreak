import {Text, View} from "react-native";
import {useTheme, Snackbar, TouchableRipple} from "react-native-paper";
import {useEffect, useState} from "react";


const SnackbarContent = ({message,visibility,setVisibility}) => {
    const theme = useTheme();

    return (
        <View>
            <TouchableRipple>
                <Snackbar
                    duration ={2000}
                    visible={visibility}
                    onDismiss ={()=>{setVisibility(false)}}
                    style={{backgroundColor: theme.colors.error}}
                >
                    <Text style={{color: theme.colors.onError}}>{message}</Text>
                </Snackbar>
            </TouchableRipple>
        </View>
    )
}
export default SnackbarContent;