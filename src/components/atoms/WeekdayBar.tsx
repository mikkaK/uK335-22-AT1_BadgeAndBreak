import {StyleSheet, View} from "react-native";
import {Avatar, TouchableRipple, useTheme} from "react-native-paper";
import WeekDays from "../../config/WeekDays";
import {useState} from "react";
import weekDays from "../../config/WeekDays";
import {WeekdayType} from "../../types/WeekDayType";



export default function () {
    const theme = useTheme();
    const [weekdays, setWeekdays] = useState<WeekdayType[]>([
        {
            isSelected: true,
            value: WeekDays.MONDAY
        },
        {
            isSelected: true,
            value: WeekDays.TUESDAY
        },
        {
            isSelected: false,
            value: WeekDays.WEDNESDAY
        },
        {
            isSelected: false,
            value: WeekDays.THURSDAY
        },
        {
            isSelected: false,
            value: WeekDays.FRIDAY
        },
        {
            isSelected: false,
            value: WeekDays.SATURDAY
        },
        {
            isSelected: false,
            value: WeekDays.SUNDAY
        }
    ])
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
    const handlePress =(value: string) => {
        let weekdaysCopy = [...weekdays]
        let index = weekdaysCopy.findIndex(item => item.value === value)
        let toChange = {...weekdaysCopy[index]}
        toChange.isSelected = !toChange.isSelected
        weekdaysCopy[index] = toChange
        setWeekdays(weekdaysCopy)

    }


    return (
        <View style={styles.container}>
            {weekdays.map((item: WeekdayType) => {
                return (
                    <View style={styles.item}>
                        <TouchableRipple onPress={() => handlePress(item.value)}>
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
