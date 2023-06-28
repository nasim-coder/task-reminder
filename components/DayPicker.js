import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const DayPicker = ({ visible = true, onSelect }) => {
    const [selectedDay, setSelectedDay] = useState('');

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        if (onSelect) {
            onSelect(day);
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <View style={styles.container}>
            {
                ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]}
                        onPress={() => handleDaySelect(day)}
                    >
                        <Text
                            style={[styles.dayText, selectedDay === day && styles.selectedDayText]}
                        >
                            {day}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    dayButton: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#DAB6EA',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#9C1D9E',
    },
    selectedDayButton: {
        backgroundColor: '#9C1D9E',
    },
    dayText: {
        color: 'black',
    },
    selectedDayText: {
        color: 'white',
    },
});

export default DayPicker;
