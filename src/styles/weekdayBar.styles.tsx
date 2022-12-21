import {StyleSheet} from "react-native";
import { useTheme} from 'react-native-paper';

const theme = useTheme();
export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        flex: 1,
        marginLeft: "1.5%",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: "#000000",
        shadowOffset: {width: 1, height: 0.5},

    },
    button: {
        backgroundColor: theme.colors.primaryContainer,

    },
    buttonSelected: {
        backgroundColor: theme.colors.secondary,
        borderColor: "#000000",
        border: "solid",
        borderRadius: 50,
        borderWidth: 1
    }
})
