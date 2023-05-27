import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const Task = (props) => {
    return (
        <View style={styles.task}>
            <Text style={styles.taskItem}>{props.task.taskTitle}</Text>
            <Text style={styles.taskItem}>{props.task.description}</Text>
            <Text>{props.task.time}</Text>
            <TouchableOpacity style={styles.taskItem}>
                <AntDesign name="edit" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.taskItem}>
            <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    task: {
        margin: 5,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
    },
    taskItem: {
        marginHorizontal:5,
    }
})

export default Task;