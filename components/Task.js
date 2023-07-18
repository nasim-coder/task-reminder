/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Task(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const time = new Date(props?.task?.time);
  const { selectedDays, frequency } = props.task;
  // console.log('frequency', frequency);
  // console.log('selectedDays', typeof props.task.selectedDays);
  let day;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (frequency === 'once') {
    const date = new Date(props.task.date);
    day = `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
  } else if (frequency === 'weekly') {
    day = days[selectedDays - 1];
  }
  // console.log(day);
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.task} numberOfLines={3}>
        {props.task.task}
      </Text>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {time.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </Text>
        {day && <Text style={styles.day}>{day}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    borderColor: '#9C1D9E',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  task: {
    flex: 1,
    fontWeight: 'bold',
    height: 40,
    textAlignVertical: 'center',
  },
  timeContainer: {
    flexDirection: 'column', // Change to column
    alignItems: 'flex-end', // Align time and day to the right
  },
  time: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#9C1D9E',
  },
  day: {
    fontSize: 13,
    color: '#9C1D9E',
  },
});

export default Task;
