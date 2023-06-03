import moment from "moment";

export const formReducer = (state, event) => {
    return {
        ...state,
        [event.target?.name]: event.target?.value
    }
}

export const enumerateDaysBetweenDates = (TimePeriodStart, TimePeriodEnd) => {
    var days = [];
    var currDate = moment(TimePeriodStart).startOf('day');
    var lastDate = moment(TimePeriodEnd).startOf('day');
    days.push(TimePeriodStart);
    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
        days.push(currDate.clone().toDate());
    }
    return days;
};
