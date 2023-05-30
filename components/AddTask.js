import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Button, ToastAndroid, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from 'expo-checkbox';
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


  return (
    <View>
      <TextInput style={styles.input}
        placeholder="Task to do"
        onChangeText={newText => setTask(newText)}
        maxLength={50}
        defaultValue={''} />

      <TextInput
        style={styles.input}
        placeholder="Add note"
        editable
        multiline
        numberOfLines={3}
        onChange={(text) => setTaskNote(text)}
        maxLength={50} />

      
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    
      
      <View>
        <Checkbox
        />
        <Text>Repeat</Text>
      </View>
      <Button title="Save Reminder" onPress={handleSaveReminder} />
    
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    
    margin:5
  }
})

export default AddTask;