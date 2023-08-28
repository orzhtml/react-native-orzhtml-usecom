import React from 'react';
import { View, Text } from 'react-native';
import { useWorkdayCalculator } from '../libs/react-native-orzhtml-usecom';

function App() {
    const initialDate = new Date('2023-06-12'); // 2023-06-12 是周日，不是工作日
    const workday = useWorkdayCalculator(initialDate);

    return (
        <View>
            <Text>初始日期: {initialDate.toDateString()}</Text>
            <Text>最近的工作日: {workday.toDateString()}</Text>
        </View>
    );
}

export default App;
