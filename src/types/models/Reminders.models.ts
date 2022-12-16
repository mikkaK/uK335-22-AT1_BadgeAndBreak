import repeatEnum from "../../config/Repeat"
import weekDayEnum from "../../config/WeekDays"

export type Reminders = {
title: string,
time: string,
days: weekDayEnum,
repeat: repeatEnum,
}