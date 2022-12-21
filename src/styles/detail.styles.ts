import { StyleSheet} from 'react-native';
import { useTheme} from 'react-native-paper';

const theme = useTheme();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        marginBottom: "5%",
        marginRight: "5%",
        marginLeft: "5%",
    },
    clockContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    snackbarContainer: {
        flex: 1.5,
        backgroundColor: "transparent"
    },
    saveContainer: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    saveButton: {
        minWidth: "50%"
    },
    snackbar: {}
})
