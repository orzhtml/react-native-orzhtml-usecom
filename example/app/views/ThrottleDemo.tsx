import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  NativeScrollEvent,
} from 'react-native';
import {useThrottle} from '../libs/react-native-orzhtml-usecom';

const ThrottleDemo = () => {
  const {execute: handleScroll} = useThrottle(
    (y: number) => {
      console.log('Current scroll position:', y);
    },
    {delay: 300},
  );

  const onScroll = (event: {nativeEvent: NativeScrollEvent}) => {
    const {contentOffset} = event.nativeEvent;
    handleScroll(contentOffset.y); // 传递纯数据而非事件对象
  };

  return (
    <View style={styles.wrap}>
      <ScrollView onScroll={onScroll}>
        {Array.from({length: 500}).map((_, index) => (
          <View key={index}>
            <Text>第 {index + 1} 个测试项</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#999',
    flex: 1,
  },
});

export default ThrottleDemo;
