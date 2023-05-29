import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';

const Task = (props) => {
    return (
        <View style={styles.taskContainer}>
            <Text style={styles.taskItem}>{props.task.taskTitle}</Text>
            <Text style={styles.taskItem}>{props.task.description}</Text>
            <Text>{props.task.time}</Text>
            <TouchableOpacity style={styles.taskItem}>
                <AntDesign name="edit" size={24} color="#0557a8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.taskItem}>
                <AntDesign name="delete" size={24} color="#0557a8" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    taskContainer: {
        margin: 5,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#88b9eb'
    },
    taskItem: {
        marginHorizontal:5,
    }
})

export default Task;