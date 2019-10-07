/**
 * @prettier
 * @flow
 * */

import moment from 'moment'
/*import { generateKeyPair } from 'crypto';*/

const AM = 'AM'
const PM = 'PM'
const YEAR = 365
const TODAY = 'Today'
const ONE_DAY_IN_SECONDS = 86400;
const ONE_SECOND = 1000;

// it takes in format '12 AM' and return 24 format
export function hourTo24Format(hour: string) {
    return parseInt(moment(hour, ['h A']).format('H'), 10)
}

// it takes in format 23 and return [11,'PM'] format
export function hourTo12Format(hour: number) {
    const currDate = new Date()
    currDate.setHours(hour)
    return dateTo12Hour(currDate.toISOString())
}

export const dateTo12Hour = (dateString: string) => {
    const localDate = new Date(dateString)
    let hour = localDate.getHours()
    if (hour === 12) {
        return ['12', PM]
    }
    if (hour === 0) {
        return ['12', AM]
    }
    const afterMidday = hour % 12 === hour
    hour = afterMidday ? hour : hour % 12
    const amPm = afterMidday ? AM : PM
    return [hour.toString(), amPm]
}

export function increaseDateByDays(date: Date, numOfDays: ?number) {
    const nextDate = new Date(date.valueOf())
    nextDate.setDate(nextDate.getDate() + numOfDays)
    return nextDate
}

export function pickerDateArray(date: string, daysCount: number = YEAR) {
    const startDate = date ? new Date(date) : new Date()
    const arr = []

    for (let i = 0; i < daysCount; i++) {
        const ithDateFromStartDate = (Date.parse(startDate) / ONE_SECOND) + (i * ONE_DAY_IN_SECONDS)
        if (moment.unix(Date.parse(new Date()) / ONE_SECOND).format('MM/DD/YYYY') ===
            moment.unix(ithDateFromStartDate).format('MM/DD/YYYY')) {
            arr.push(TODAY)
        }
        else {
            arr.push(
                formatDatePicker(ithDateFromStartDate)
            )
        }
    }
    return arr
}


/* Function pickerDayArray, getDaysinMonth
** Author Maria Voreakou
*/
export function getDaysInMonth(month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
};

export function pickerBirthdayArray(selectedYear, selectedMonth) {

    const dayArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16",
        "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
    const monthArr = [];
    const yearArr = [];

    let currentMoment = new Date();

    var birthdayPicker = new Object();
    birthdayPicker.yearArray = yearArr;
    birthdayPicker.monthArray = monthArr;
    birthdayPicker.dayArray = dayArr;
    
    birthdayPicker.currentDay = currentMoment.getDate()+"";
    birthdayPicker.currentMonth = (currentMoment.getMonth() + 1)+"";
    birthdayPicker.currentYear = currentMoment.getFullYear()+"";
    birthdayPicker.checkValue = getDaysInMonth(selectedMonth, selectedYear);

    
    //loop until current year
    for (year = 1900; year <= birthdayPicker.currentYear; year++) {
        birthdayPicker.yearArray.push(year + "");
    }
    //create months array and check for the last month of the current year
    //if selected is the current create months up to to current
    if (selectedYear == birthdayPicker.currentYear) {
        for (i = 1; i <= birthdayPicker.currentMonth; i++) {
            birthdayPicker.monthArray.push(i + "");
        }
    }
    //else create all months
    else {
        for (i = 1; i <= 12; i++) {
            birthdayPicker.monthArray.push(i + "");
        }
    }
    //if selected year and selected month is the current, then show days up to today
    if (selectedYear == birthdayPicker.currentYear && selectedMonth == birthdayPicker.currentMonth) {
        birthdayPicker.dayArray.splice(birthdayPicker.currentDay);


        birthdayPicker.dayArray[birthdayPicker.currentDay];
        birthdayPicker.monthArray[selectedMonth-1];
        birthdayPicker.yearArray[selectedYear];
    }
    else {
        if (birthdayPicker.checkValue == 30) {
            birthdayPicker.dayArray.splice(30);

            birthdayPicker.dayArray[birthdayPicker.currentDay];
            birthdayPicker.monthArray[selectedMonth-1];
            birthdayPicker.yearArray[selectedYear];
        }
        else if (getDaysInMonth(selectedMonth, selectedYear) == 29) {
            birthdayPicker.dayArray.splice(29);

            birthdayPicker.dayArray[birthdayPicker.currentDay];
            birthdayPicker.monthArray[selectedMonth-1];
            birthdayPicker.yearArray[selectedYear];
        }
        else if (birthdayPicker.checkValue == 28) {
            birthdayPicker.dayArray.splice(28);

            birthdayPicker.dayArray[birthdayPicker.currentDay];
            birthdayPicker.monthArray[selectedMonth-1];
            birthdayPicker.yearArray[selectedYear];
        }
    }
    return birthdayPicker;
}




function formatDatePicker(date: number) {
    return moment.unix(date).format('ddd MMM D');
}

export function getHoursArray(format24: boolean) {
    const hours = format24 ? { min: 0, max: 23 } : { min: 1, max: 12 }
    const arr = []
    for (let i = hours.min; i <= hours.max; i++) {
        arr.push(`00${i}`.slice(-2))
    }
    return arr
}

export function getFiveMinutesArray() {
    const arr = []
    arr.push('00')
    arr.push('05')
    for (let i = 10; i < 60; i += 5) {
        arr.push(`${i}`)
    }
    return arr
}

export function getAmArray() {
    const arr = []
    arr.push(AM)
    arr.push(PM)
    return arr
}

