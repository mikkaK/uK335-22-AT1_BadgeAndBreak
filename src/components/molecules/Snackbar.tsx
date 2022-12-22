import {Text, View} from "react-native";
import {useTheme, Snackbar, TouchableRipple} from "react-native-paper";
import {useTranslation} from "react-i18next";


const SnackbarContent = ({message,visibility,setVisibility,color}) => {
    const theme = useTheme();
    const {t} = useTranslation()
    return (
        <View>
            <TouchableRipple>
                <Snackbar

                    duration ={2000}
                    visible={visibility}
                    onDismiss ={()=>{setVisibility(false)}}
                    style={{backgroundColor: color === "error" ? theme.colors.error : color === "success" ? "green" : "gray"}}
                >
                    <Text style={{color: theme.colors.onError}}>{message}</Text>
                </Snackbar>
            </TouchableRipple>
        </View>
    )
}
export default SnackbarContent;