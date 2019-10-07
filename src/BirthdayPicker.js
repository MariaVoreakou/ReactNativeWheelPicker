/* * 
 * Birthday Picker (Day - Month - Year)
 * Author: Maria Voreakou
 * */
import React from 'react'
import { View, StyleSheet } from 'react-native'

import WheelPicker from './WheelPicker'
import { pickerBirthdayArray } from 'react-native-wheel-picker-android/src/Utils'

type State = {
  selectedDay: Number, selectedonth: Number, selectedYear: number,
  daysArray: Array<Number>, monthsArray: Array<Number>, yearsArray: Array<Number>,
}
type Props = {
  onValueSelection: Date => void,
  hideIndicator?: boolean,
  selectedItem?: number,
  paparakos?: boolean

}

export default class BirthdayPicker extends React.Component {
  constructor() {
    super()

    let currentMoment = new Date();
    initYear = currentMoment.getFullYear();
    initMonth = (currentMoment.getMonth() + 1);
    initDay = currentMoment.getDate();
    selectedYear = currentMoment.getFullYear() + "";
    selectedMonth = (currentMoment.getMonth() + 1) + "";
    selectedDay = currentMoment.getDate() + "";

    if (selectedDay.length == 1) {
      selectedDay = "0" + selectedDay;
    }

    if (selectedMonth.length == 1) {
      selectedMonth = "0" + selectedMonth;
    }

    var returnObject = pickerBirthdayArray(initYear, initMonth);
    daysArray = returnObject.dayArray;
    monthsArray = returnObject.monthArray;
    yearsArray = returnObject.yearArray;

    this.state = {
      selectedYear: selectedYear,
      selectedMonth: selectedMonth,
      selectedDay: selectedDay,
      daysArray: daysArray,
      monthsArray: monthsArray,
      yearsArray: yearsArray,
      initYear: initYear,
      initMonth: initMonth,
      initDay: initDay,
      selectedItem: 0,
    }
  }

  onDaySelected = (selectedPosition) => {
    localSelectedMonth = this.state.selectedMonth;
    localSelectedYear = this.state.selectedYear;
    localSelectedDay = this.state.daysArray[selectedPosition];

    if (localSelectedDay.length == 1) {
      localSelectedDay = "0" + localSelectedDay;
    }
    if (localSelectedMonth.length == 1) {
      localSelectedMonth = "0" + localSelectedMonth;
    }

    localArrObj = pickerBirthdayArray(localSelectedYear, localSelectedMonth);

    this.setState({
      selectedYear: localSelectedYear,
      selectedMonth: localSelectedMonth,
      selectedDay: localSelectedDay,
      daysArray: localArrObj.dayArray,
      monthsArray: localArrObj.monthArray,
      yearsArray: localArrObj.yearArray
    });
    if (this.props.onValueSelection) {
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));
    }
  }
  onMonthSelected = (selectedPosition) => {
    localSelectedMonth = this.state.monthsArray[selectedPosition];
    localSelectedYear = this.state.selectedYear;
    localSelectedDay = this.state.selectedDay;

    let myDate = new Date(localSelectedYear, localSelectedMonth, 0);
    var monthPicker = new Object();

    monthPicker.checkDate = myDate.getDate();

    //if days of month are 31
    if (monthPicker.checkDate == 31) {
      
      if (localSelectedDay == "30") {
        localSelectedDay = "31";
      }
      if (("" + localSelectedDay).length == 1) {
        localSelectedDay = "0" + localSelectedDay;
      }
      if (("" + localSelectedMonth).length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));

    }
    //if days of month are 30
    else if (monthPicker.checkDate == 30) {
      if (localSelectedDay == this.state.daysArray[30]) {
        localSelectedDay = this.state.daysArray[29];
      }
      if (("" + localSelectedDay).length == 1) {
        localSelectedDay = "0" + localSelectedDay;
      }
      if (("" + localSelectedMonth).length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));

    }
    //if days of month are 29
    else if (monthPicker.checkDate == 29) {
      if (localSelectedDay == this.state.daysArray[30] || localSelectedDay == this.state.daysArray[29]) {
        localSelectedDay = this.state.daysArray[28];
      }
      if ("" + localSelectedDay.length == 1) {
        localSelectedDay = "0" + localSelectedDay;
      }
      if ("" + localSelectedMonth.length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));

    }
    //if days of month are 28
    else if (monthPicker.checkDate == 28) {
      if (localSelectedDay == "31" || localSelectedDay == "30" || localSelectedDay == "29") {
        localSelectedDay = "28"
      }
      if ("" + localSelectedDay.length == 1) {
        localSelectedDay = "0" + localSelectedDay;
      }
      if ("" + localSelectedMonth.length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));

    }
    else {
      this.state.daysArray[localSelectedDay - 1];
      if ("" + localSelectedDay.length == 1) {
        localSelectedDay = "0" + localSelectedDay;
      }
      if ("" + localSelectedMonth.length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));
    }

    localArrObj = pickerBirthdayArray(localSelectedYear, localSelectedMonth);

    this.setState({
      selectedYear: localSelectedYear,
      selectedMonth: localSelectedMonth,
      selectedDay: localSelectedDay,
      daysArray: localArrObj.dayArray,
      monthsArray: localArrObj.monthArray,
      yearsArray: localArrObj.yearArray
    });

  }
  onYearSelected = (selectedPosition) => {
    localSelectedMonth = this.state.selectedMonth;
    localSelectedYear = this.state.yearsArray[selectedPosition];
    localSelectedDay = this.state.selectedDay;

    let myDate = new Date(localSelectedYear, localSelectedMonth, 0);
    var yearPicker = new Object();

    yearPicker.checkDate = myDate.getDate();

    //if days of month is 30
    if (yearPicker.checkDate == 30) {
      this.state.daysArray[29];
      //if selected date is 31
      if (localSelectedDay == this.state.daysArray[30]) {
        localSelectedDay = this.state.daysArray[29];
      }
      //if day has one digit
      if (localSelectedMonth.length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));
    }

    //if days of month is 29
    else if (yearPicker.checkDate == 29) {
      this.state.daysArray[28];
      //console.log("Here the bug" + localSelectedDay);
      //if selected day is greater than 29
      if (localSelectedDay == "31" || localSelectedDay == "30" || localSelectedDay == "29") {
        localSelectedDay = "29";
      }
      //if selected day is 28
      else if (localSelectedDay == "28") {
        localSelectedDay = "28";
      }
      //if month has one digit
      if (localSelectedMonth.length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));
    }
    //if days of month is 28
    else if (yearPicker.checkDate == 28) {
      localSelectedDay = this.state.daysArray[27];
      //if day is 31 or 30 or 29
      if (localSelectedDay == "31" || localSelectedDay == "30" || localSelectedDay == "29") {
        localSelectedDay = "28";
      }
      //if month has one digit
      if (localSelectedMonth.length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));
    }
    else {
      this.state.daysArray[localSelectedDay - 1];
      if (localSelectedDay.length == 1) {
        localSelectedDay = "0" + localSelectedDay;
      }
      if (localSelectedMonth.length == 1) {
        localSelectedMonth = "0" + localSelectedMonth;
      }
      this.props.onValueSelection(new Date(localSelectedYear + "-" + localSelectedMonth + "-" + localSelectedDay));
    }

    localArrObj = pickerBirthdayArray(localSelectedYear, localSelectedMonth);

    this.setState({
      selectedYear: localSelectedYear,
      selectedMonth: localSelectedMonth,
      selectedDay: localSelectedDay,
      daysArray: localArrObj.dayArray,
      monthsArray: localArrObj.monthArray,
      yearsArray: localArrObj.yearArray
    });
  }




  render() {

    return (
      <View style={[styles.container,]}>
        <WheelPicker
          style={styles.birthdayWheelPicker}
          data={this.state.daysArray}
          onItemSelected={this.onDaySelected}
          isCyclic={false}
          initPosition={initDay - 1}
          selectedItem={this.state.onDaySelected}
        />
        <WheelPicker
          style={styles.birthdayWheelPicker}
          data={this.state.monthsArray}
          onItemSelected={this.onMonthSelected}
          isCyclic={false}
          initPosition={initMonth - 1}
          selectedItem={this.state.onMonthSelected}
        />
        <WheelPicker
          style={styles.birthdayWheelPicker}
          data={this.state.yearsArray}
          onItemSelected={this.onYearSelected}
          isCyclic={false}
          initPosition={this.state.yearsArray.length - 1}
          selectedItem={this.state.onYearSelected}
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: "50%",
    alignContent: "center",
    justifyContent: "center"
  },
  birthdayWheelPicker: {
    alignContent: "center",
    justifyContent: "center",
    height: 110,
    width: null,
    flex: 1,
  },
})


