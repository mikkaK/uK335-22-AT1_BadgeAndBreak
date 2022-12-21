import {Button, StatusBar, StyleSheet, View} from "react-native";
import {IconButton, useTheme} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import Repeat from "../../config/Repeat";
import {useTranslation} from "react-i18next";
type PropType = {
    handleChange:( value:string ) => any;
    selectedValue?:string;
}
export default function (props:PropType) {
    const { handleChange, selectedValue } = props;
    const theme = useTheme();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [repeat, setRepeat] = useState<string>(selectedValue ? selectedValue : "never")
    const {t} = useTranslation()
    const repeatOptions = [
        {
            label: t("description.never"),
            value: Repeat.NEVER_REPEAT,
        },
        {
            label: t("description.weekly"),
            value: Repeat.WEEKLY_REPEAT,
        },
        {
            label: t("description.monthly"),
            value: Repeat.MONTHLY_REPEAT,
        },
        {
            label: t("description.yearly"),
            value: Repeat.YEARLY_REPEAT,
        }
    ]

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
                    setValue={(_value:string) => {
                        setRepeat(_value);
                        handleChange(_value);
                    }}
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
