import repeatEnum from "../../config/Repeat"
import weekDayEnum from "../../config/WeekDays"
import {WeekdayType} from "../WeekDayType";

export type ReminderType = {
id: number,
title: string,
time: string,
days: WeekdayType[],
repeat: string,
isActive: boolean
}
