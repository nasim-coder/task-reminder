/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  View, Button, ToastAndroid, StyleSheet, Alert, StatusBar,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RadioButton, TextInput, FAB } from 'react-native-paper';
import { saveReminder } from './StorageService';
import DayPicker from './DayPicker';

// eslint-disable-next-line react/prop-types
function AddTask({ navigation }) {
  const [time, setTime] = useState('Choose time');
  const [isTimeSelectedByUser, setIsTimeSelectedByUser] = useState(false);
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showdays, setShowdays] = useState(false);
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
  };

  const handleSaveReminder = async () => {
    try {
      if (!isTimeSelectedByUser) {
        Alert.alert('COULD NOT BE SAVED', 'Please select time', [{ text: 'OK' }], { cancelable: false });
      } else if (isTimeSelectedByUser) {
        await saveReminder(newTask);
        ToastAndroid.show('Reminder saved Successfully!', ToastAndroid.LONG);
        // eslint-disable-next-line react/prop-types
        navigation.goBack();
      } else {
        Alert.alert('COULD NOT BE SAVED', 'something went wrong', [{ text: 'OK' }], { cancelable: false });
      }
    } catch (err) {
      Alert.alert('COULD NOT BE SAVED', err.message, [{ text: 'OK' }], { cancelable: false });
    }
  };

  const handleTimeConfirm = (timee) => {
    setIsTimeSelectedByUser(true);
    setTime(timee);
    // eslint-disable-next-line no-use-before-define
    hideTimePicker();
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const handleDateConfirm = (datee) => {
    // console.log("A date has been picked: ", date);
    setDate(datee);
    // eslint-disable-next-line no-use-before-define
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleFrequencyChange = (newValue) => {
    setFrequency(newValue);
  };

  const handleDaySelect = (day) => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const index = days.indexOf(day) + 1;
    setSelectedDays(index);
  };

  useEffect(() => {
    if (frequency === 'weekly') {
      setShowdays(true);
    } else if (frequency === 'once') {
      setDatePickerVisibility(true);
      setShowdays(false);
    } else {
      setShowdays(false);
    }
  }, [frequency]);

  return (

    // eslint-disable-next-line react/jsx-filename-extension, no-use-before-define
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C1D9E" />
      <TextInput
        style={styles.input}
        placeholder="Enter Task to do"
        onChangeText={(newText) => setTask(newText)}
        maxLength={100}
        mode="outlined"
        selectionColor="#9C1D9E"
        activeOutlineColor="#9C1D9E"
        outlineColor="#9C1D9E"
        defaultValue=""
      />

      <TextInput
        style={styles.input}
        placeholder="Task note ( optional )"
        editable
        multiline
        mode="outlined"
        selectionColor="#9C1D9E"
        outlineColor="#9C1D9E"
        activeOutlineColor="#9C1D9E"
        numberOfLines={4}
        onChangeText={(newText) => setTaskNote(newText)}
        maxLength={200}
      />

      <View style={styles.buttonTime}>
        <Button title={time?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} color="#9C1D9E" onPress={showTimePicker} />
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
          color="#9C1D9E"
          status={frequency === 'daily' ? 'checked' : 'unchecked'}
          onPress={() => handleFrequencyChange('daily')}
        />
        <RadioButton.Item
          label="Weekly"
          value="weekly"
          color="#9C1D9E"
          status={frequency === 'weekly' ? 'checked' : 'unchecked'}
          onPress={() => handleFrequencyChange('weekly')}
        />
        <RadioButton.Item
          label="Once"
          value="once"
          color="#9C1D9E"
          status={frequency === 'once' ? 'checked' : 'unchecked'}
          onPress={() => handleFrequencyChange('once')}
        />
      </View>

      <DayPicker onSelect={handleDaySelect} visible={showdays} />

      <FAB
        // icon="plus"
        label="SAVE"
        color="white"
        style={styles.fab}
        onPress={handleSaveReminder}
      />
      {/* <View style={styles.saveButtonContainer}>
        <Button title="Save Reminder" color="#9C1D9E" onPress={handleSaveReminder} />
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#DAB6EA',
  },
  input: {
    marginTop: 5,
    marginBottom: 10,
  },
  buttonTime: {
    marginTop: 10,
    marginBottom: 10,
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
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  saveButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 35,
    bottom: 35,
    backgroundColor: '#9C1D9E',
    borderRadius: 50, // Set the borderRadius to half the width/height to make it round
  },
});

export default AddTask;
