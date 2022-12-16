import {Button, StatusBar, StyleSheet, View} from "react-native";
import {IconButton, useTheme} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import Repeat from "../../config/Repeat";

export default function () {
    const theme = useTheme();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [repeat, setRepeat] = useState<string>("never")
    const [repeatOptions, setRepeatOptions] = useState( [
        {
            label: "Never",
            value: Repeat.NEVER_REPEAT,
        },
        {
            label: "Daily",
            value: Repeat.DAILY_REPEAT,
        },
        {
            label: "Weekly",
            value: Repeat.WEEKLY_REPEAT,
        },
        {
            label: "Monthly",
            value: Repeat.MONTHLY_REPEAT,
        },
        {
            label: "Yearly",
            value: Repeat.YEARLY_REPEAT,
        }
    ])

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
        },
        items: {},
        dropdown: {
            flex: 4,
        },
        repeatIcon: {
            flex: 1,
            alignItems: "center"
        },
        dropDownIcon: {
            flex: 1,
            alignItems: "center"
        }

    })

    return (
        <View style={styles.container}>
            <View style={styles.repeatIcon}>
                <IconButton
                    icon={"repeat-variant"}
                    size={45}
                    iconColor={theme.colors.onPrimary}
                />
            </View>
            <View style={styles.dropdown}>
                <DropDown
                    mode={"flat"}
                    visible={showDropDown}
                    onDismiss={() => {
                        setShowDropDown(false)
                    }}
                    showDropDown={() => {
                        setShowDropDown(true)
                    }}
                    value={repeat}
                    setValue={setRepeat}
                    list={repeatOptions}
                    theme={theme}
                />
            </View>
            <View>
                {!showDropDown ?
                <IconButton
                    icon={"chevron-down"}
                    size={30}
                    iconColor={theme.colors.onPrimary}
                    animated={true}
                    onPress={() => setShowDropDown(true)}
                />
                    :
                <IconButton
                    icon={"chevron-up"}
                    size={30}
                    iconColor={theme.colors.onPrimary}
                    animated={true}
                    onPress={() => setShowDropDown(true)}
                />
                }
            </View>
        </View>
    )


}