import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Button, ToastAndroid, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';
const AddTask = () => {

  const [task, setTask] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



  const handleSaveReminder = () => {
    // Code to save the reminder
    ToastAndroid.show('Reminder saved!', ToastAndroid.SHORT);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const [value, setValue] = useState('daily');

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <View>
      <TextInput style={styles.input}
        placeholder="Enter Task to do"
        onChangeText={newText => setTask(newText)}
        maxLength={100}
        defaultValue={''} />

      <TextInput
        style={styles.input}
        placeholder="Task note"
        editable
        multiline
        numberOfLines={4}
        onChange={(text) => setTaskNote(text)}
        maxLength={140} />


      <View style={styles.button}>
      <Button title="Choose time" onPress={showDatePicker} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />


<View style={{ flexDirection: 'row' }}>
      <RadioButton.Item
        label="Daily"
        value="daily"
        status={value === 'daily' ? 'checked' : 'unchecked'}
        onPress={() => handleValueChange('daily')}
      />
      <RadioButton.Item
        label="Weekly"
        value="weekly"
        status={value === 'weekly' ? 'checked' : 'unchecked'}
        onPress={() => handleValueChange('weekly')}
      />
      <RadioButton.Item
        label="Once"
        value="once"
        status={value === 'once' ? 'checked' : 'unchecked'}
        onPress={() => handleValueChange('once')}
      />
    </View>
      
      <View style={styles.button}>
      <Button title="Save Reminder" onPress={handleSaveReminder} />
      </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,

    margin: 10
  },
  button: {
    margin: 50
  }
})

export default AddTask;