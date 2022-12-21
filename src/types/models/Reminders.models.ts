import repeatEnum from "../../config/Repeat"
import weekDayEnum from "../../config/WeekDays"
import {WeekdayType} from "../WeekDayType";
import {Moment} from "moment";

export type ReminderType = {
id: number,
title: string,
time: Moment,
days: WeekdayType[],
repeat: string,
isActive: boolean
}
