import {StyleSheet} from "react-native";

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
    buttonSelected: {
        borderColor: "#000000",
        border: "solid",
        borderRadius: 50,
        borderWidth: 1
    }
})
