import React from "react";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

const AddTask = () => {
    return (
        <View>
            <TextInput style={{ height: 40 }}
                placeholder="Task Title"
                onChangeText={newText => setText(newText)}
                defaultValue={text} />
            
            <TextInput
                style={{ height: 40 }}
                placeholder="Task Description"
                editable
                multiline
                numberOfLines={4}
                maxLength={40} />
            <TextInput />
        </View>
    )
}