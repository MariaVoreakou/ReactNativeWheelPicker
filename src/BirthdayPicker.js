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


}

export default class BirthdayPicker extends React.Component {
  constructor() {
    super()

    let currentMoment = new Date();
    const initYear = currentMoment.getFullYear();
    const initMonth = currentMoment.getMonth() + 1;

    selectedYear = currentMoment.getFullYear()+"";
    selectedMonth = (currentMoment.getMonth() + 1)+"";

    selectedDay = currentMoment.getDate()+"";

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
      yearsArray: yearsArray
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
  onYearSelected = (selectedPosition) => {
    localSelectedMonth = this.state.selectedMonth;
    localSelectedYear = this.state.yearsArray[selectedPosition];
    localSelectedDay = this.state.selectedDay;

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



  render() {

    return (
      <View style={[styles.container,]}>
        <WheelPicker
          style={styles.birthdayWheelPicker}
          data={this.state.daysArray}
          onItemSelected={this.onDaySelected}
          isCyclic={false}
          initPosition={0}
        />
        <WheelPicker
          style={styles.birthdayWheelPicker}
          data={this.state.monthsArray}
          onItemSelected={this.onMonthSelected}
          isCyclic={false}
          initPosition={0}
        />
        <WheelPicker
          style={styles.birthdayWheelPicker}
          data={this.state.yearsArray}
          onItemSelected={this.onYearSelected}
          isCyclic={false}
          initPosition={this.state.yearsArray.length - 1}
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
