import {DateTime} from "luxon";

export default class DateService {
  public static formatDate (date: DateTime | null = null, time: DateTime | null = null) {
    let dateTime = DateTime.now();

    if (date) {
      dateTime = dateTime.set({ year: date.year, month: date.month, day: date.day })
    }

    if (time) {
      dateTime = dateTime.set({ hour: time.hour, minute: time.minute, second: time.second })
    }

    return dateTime
  }
}
