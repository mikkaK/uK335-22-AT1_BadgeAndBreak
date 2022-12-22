import {Text, View} from "react-native";
import {Snackbar, TouchableRipple, useTheme} from "react-native-paper";

/**
 *
 * @param message (message to be displayed on snackbar)
 * @param visibility (if set to true the snackbar is displayed)
 * @param setVisibility (callBack function to reset visibility)
 * @param color (color of the snackbar "error" for a red error snackbar and "green" for a green one. undefined will display a gray snackbar)
 * @constructor
 */

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
