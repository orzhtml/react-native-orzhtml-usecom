import React from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  Button,
  StyleSheet,
} from 'react-native';

// import { useSingleState, useSingleInstanceVar } from 'react-native-orzhtml-usecom'
import {useSingleState} from './app/libs/react-native-orzhtml-usecom';
import FormDemo from './app/views/FormDemo';
// import UserList from './app/views/UserList';
import DebounceDemo from './app/views/DebounceDemo';
import ThrottleDemo from './app/views/ThrottleDemo';

const App = () => {
  const [state, setState] = useSingleState({
    tabType: 0,
  });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.buttonContainer}>
        <Button
          title="useFormDemo"
          onPress={() => {
            setState({tabType: 0});
          }}
        />
        {/* <Button
          title="useUserList"
          onPress={() => {
            setState({tabType: 1});
          }}
        /> */}
        <Button
          title="useDebounce"
          onPress={() => {
            setState({tabType: 2});
          }}
        />
        <Button
          title="useThrottle"
          onPress={() => {
            setState({tabType: 3});
          }}
        />
      </View>
      {state.tabType === 0 ? <FormDemo /> : null}
      {/* {state.tabType === 1 ? <UserList /> : null} */}
      {state.tabType === 2 ? <DebounceDemo /> : null}
      {state.tabType === 3 ? <ThrottleDemo /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {marginTop: 60},
});

export default App;
