import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';

const Task = (props) => {
    return (
        <View style={styles.taskContainer}>
            <Text style={styles.task} numberOfLines={3} >
                {props.task.taskTitle}
            </Text>
            <Text style={styles.time} >
                {props.task.time.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
                
            </Text>
        </View>
    );
};



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
    
    time: {
        fontSize: 14,
        fontWeight: 'bold',
        color:'#9C1D9E'
    },
});

export default Task;