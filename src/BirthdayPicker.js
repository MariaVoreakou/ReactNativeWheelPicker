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

export default class BirthdayPicker extends React.Component {
  constructor() {
    super()

    let currentMoment = new Date();
    const initYear = currentMoment.getFullYear();
    const initMonth = currentMoment.getMonth() + 1;

    selectedYear = currentMoment.getFullYear();
    selectedMonth = currentMoment.getMonth() + 1;
    selectedDay = currentMoment.getDate();

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
  
    localArrObj = pickerBirthdayArray(localSelectedYear, localSelectedMonth);
  
    this.setState({
      selectedYear: localSelectedYear,
      selectedMonth: localSelectedMonth,
      selectedDay: localSelectedDay,
      daysArray: localArrObj.dayArray,
      monthsArray: localArrObj.monthArray,
      yearsArray: localArrObj.yearArray});
  
  }
  onMonthSelected = (selectedPosition) => {
    localSelectedMonth = this.state.monthsArray[selectedPosition];
    localSelectedYear = this.state.selectedYear;
    localSelectedDay = this.state.selectedDay;
  
    localArrObj = pickerBirthdayArray(localSelectedYear, localSelectedMonth);
  
    this.setState({
      selectedYear: localSelectedYear,
      selectedMonth: localSelectedMonth,
      selectedDay: localSelectedDay,
      daysArray: localArrObj.dayArray,
      monthsArray: localArrObj.monthArray,
      yearsArray: localArrObj.yearArray});
  }
  onYearSelected = (selectedPosition) => {
    localSelectedMonth = this.state.selectedMonth;
    localSelectedYear = this.state.yearsArray[selectedPosition];
    localSelectedDay = this.state.selectedDay;
  
    localArrObj = pickerBirthdayArray(localSelectedYear, localSelectedMonth);
  
    this.setState({
      selectedYear: localSelectedYear,
      selectedMonth: localSelectedMonth,
      selectedDay: localSelectedDay,
      daysArray: localArrObj.dayArray,
      monthsArray: localArrObj.monthArray,
      yearsArray: localArrObj.yearArray});
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
  },
  wheelPicker: {
    height: 150,
    width: null,
    flex: 1,
  },
  birthdayWheelPicker: {
    height: 150,
    width: null,
    flex: 3,
  },
})
