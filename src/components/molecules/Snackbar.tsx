import {Text, View} from "react-native";
import {Snackbar, TouchableRipple, useTheme} from "react-native-paper";


const SnackbarContent = ({message, visibility, setVisibility, color}) => {
    const theme = useTheme();
    return (
        <View>
            <TouchableRipple>
                <Snackbar
                    duration={2000}
                    visible={visibility}
                    onDismiss={() => {
                        setVisibility(false)
                    }}
                    style={{backgroundColor: color === "error" ? theme.colors.error : color === "success" ? "green" : "gray"}}
                >
                    <Text style={{color: theme.colors.onError}}>{message}</Text>
                </Snackbar>
            </TouchableRipple>
        </View>
    )
}
export default SnackbarContent;
