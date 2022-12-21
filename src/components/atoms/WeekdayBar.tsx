import {StyleSheet, View} from "react-native";
import {Avatar, TouchableRipple, useTheme} from "react-native-paper";
import WeekDays from "../../config/WeekDays";
import {useEffect, useState} from "react";
import {WeekdayType} from "../../types/WeekDayType";
import {useTranslation} from "react-i18next";

type PropType = {
    handleStateChange: (stateAndValue : {
        isSelected: boolean,
        value: string
    }) => any;

    selectedValues?: WeekdayType[];
}

export default function (props:PropType) {
    const theme = useTheme();
    const {handleStateChange, selectedValues} = props;
    const {t} = useTranslation()
    const [weekdays, setWeekdays] = useState<WeekdayType[]>([
        {
            isSelected: false,
            value: t("description." + WeekDays.MONDAY)
        },
        {
            isSelected: false,
            value: t("description." + WeekDays.TUESDAY)
        },
        {
            isSelected: false,
            value: t("description." + WeekDays.WEDNESDAY)
        },
        {
            isSelected: false,
            value: t("description." + WeekDays.THURSDAY)
        },
        {
            isSelected: false,
            value: t("description." + WeekDays.FRIDAY)
        },
        {
            isSelected: false,
            value: t("description." + WeekDays.SATURDAY)
        },
        {
            isSelected: false,
            value: t("description." + WeekDays.SUNDAY)
        }
    ])

    useEffect(() => {
        let weekdaysCopy = [...weekdays];
        if (selectedValues){
            for (const weekDay of weekdaysCopy) {
                for (const selectedValue of selectedValues) {
                    if (selectedValue.value === weekDay.value){
                        let index = weekdaysCopy.findIndex(item => item.value === selectedValue.value);
                        weekdaysCopy[index].isSelected = true;
                    }
                }
            }
        }
    },[selectedValues])
    const styles = StyleSheet.create({
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

    const handlePress =(item:WeekdayType) => {
        const { value } = item;
        let weekdaysCopy = [...weekdays]
        let index = weekdaysCopy.findIndex(item => item.value === value)
        let toChange = {...weekdaysCopy[index]}
        toChange.isSelected = !toChange.isSelected
        weekdaysCopy[index] = toChange
        setWeekdays(weekdaysCopy)
        //todo simplify
        handleStateChange(weekdaysCopy[index]);
    }


    return (
        <View style={styles.container}>
            {weekdays.map((item: WeekdayType) => {
                return (
                    <View style={styles.item}>
                        <TouchableRipple onPress={() => handlePress(item)}>
                        <Avatar.Text size={40}
                                     label={item.value}
                                     style={item.isSelected ? styles.buttonSelected : styles.button}
                                     labelStyle={{fontWeight: "bold", fontSize: 17}}
                        />
                        </TouchableRipple>
                    </View>
                )
            })}
        </View>
    );
}
