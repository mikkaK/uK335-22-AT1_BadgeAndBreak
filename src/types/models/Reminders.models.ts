import repeatEnum from "../../config/Repeat"
import weekDayEnum from "../../config/WeekDays"

export type ReminderType = {
title: string,
time: string,
days: weekDayEnum[],
repeat: repeatEnum,
isActive: boolean
}
