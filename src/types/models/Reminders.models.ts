import {WeekdayType} from "../WeekDayType";
import {Moment} from "moment";

export type ReminderType = {
    id: number,
    title: string,
    time: Moment,
    days: WeekdayType[],
    repeat: string,
    Active: boolean,
}
