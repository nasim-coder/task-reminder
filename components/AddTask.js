import React, { useState, useEffect } from "react";
import { View, Modal, Text, TouchableOpacity, TextInput, SafeAreaView, Button, ToastAndroid, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { saveReminder } from './ReminderService';
// import Checkbox from 'expo-checkbox';
import { RadioButton, Checkbox } from 'react-native-paper';

const AddTask = () => {

  const [time, setTime] = useState(new Date());
  const [isTimeSelectedByUser, setIsTimeSelectedByUser] = useState(false);
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [frequency, setFrequency] = useState('daily');


  const newTask = {
    id: new Date().getTime(),
    task,
    taskNote,
    time,
    date,
    frequency,
    selectedDays,
}


  const handleSaveReminder = () => {
    try {
      
      if (!isTimeSelectedByUser) {
        Alert.alert('COULD NOT BE SAVED','Please select time',[ {text: 'OK'}], {cancelable: false});
      }else if (isTimeSelectedByUser) {
        const saved = saveReminder(newTask);
        ToastAndroid.show('Reminder saved Successfully!', ToastAndroid.LONG);
      } else {
        Alert.alert('COULD NOT BE SAVED','something went wrong',[ {text: 'OK'}], {cancelable: false});
      }
      
    } catch (err) {
      console.log(err);
      Alert.alert('COULD NOT BE SAVED', err.message, [ {text: 'OK'}], {cancelable: false});
    }
  };

  const handleTimeConfirm = (time) => {
    console.log("A date has been picked: ", time);
    setIsTimeSelectedByUser(true);
    setTime(time);
    hideTimePicker();
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const handleDateConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDate(date)
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleFrequencyChange = (newValue) => {
    setFrequency(newValue);
  };


  console.log(selectedDays);
  const daysOfWeek = [
    { id: '1', name: 'Sunday' },
    { id: '2', name: 'Monday' },
    { id: '3', name: 'Tuesday' },
    { id: '4', name: 'Wednesday' },
    { id: '5', name: 'Thursday' },
    { id: '6', name: 'Friday' },
    { id: '7', name: 'Saturday' },
  ];

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleDone = () => {
    // Do something with the selected days
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedDays([]);
    setModalVisible(false);
  }

  useEffect(() => {
    if (frequency === 'weekly') {
      setModalVisible(true);
    } else if (frequency==='once') {
      setDatePickerVisibility(true)
     } else{
      setModalVisible(false);
    }
  }, [frequency]);

  
  
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder="Enter Task to do"
        onChangeText={newText => setTask(newText)}
        maxLength={100}
        defaultValue={''} />

      <TextInput
        style={styles.input}
        placeholder="Task note ( you can write why it is important )"
        editable
        multiline
        numberOfLines={4}
        onChange={(text) => setTaskNote(text)}
        maxLength={200} />


      <View style={styles.buttonTime}>
        <Text>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        <Button title="Choose time" onPress={showTimePicker} />
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <View style={{ flexDirection: 'row' }}>
        <RadioButton.Item
          label="Daily"
          value="daily"
          status={frequency === 'daily' ? 'checked' : 'unchecked'}
          onPress={() => handleFrequencyChange('daily')}
        />
        <RadioButton.Item
          label="Weekly"
          value="weekly"
          status={frequency === 'weekly' ? 'checked' : 'unchecked'}
          onPress={() => handleFrequencyChange('weekly')}
        />
        <RadioButton.Item
          label="Once"
          value="once"
          status={frequency === 'once' ? 'checked' : 'unchecked'}
          onPress={() => handleFrequencyChange('once')}
        />
      </View>

      <View style={styles.daysContainer}>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {daysOfWeek.map((day) => (
                <Checkbox.Item
                  key={day.id}
                  label={day.name}
                  status={selectedDays.includes(day.id) ? 'checked' : 'unchecked'}
                  onPress={() => handleDayToggle(day.id)}
                />
              ))}

              <View style={styles.buttonContainer}>
                <Button title='Cancel' onPress={handleCancel} />
                <Button title='Done' onPress={handleDone} />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.saveButtonContainer}>
        <Button title="Save Reminder" onPress={handleSaveReminder} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonTime: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 70,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
  daysContainer: {
    flex: 1,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  saveButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
})

export default AddTask;