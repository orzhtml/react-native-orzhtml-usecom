import React from 'react'
import {
  StatusBar,
  useColorScheme,
  View,
  Button,
} from 'react-native'

// import { useSingleState, useSingleInstanceVar } from 'react-native-orzhtml-usecom'
import { useSingleState } from './app/libs/react-native-orzhtml-usecom'
import FormDemo from './app/views/FormDemo'
import UserList from './app/views/UserList'

const App = () => {
  const [state, setState] = useSingleState({
    tabType: 0
  })

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    flex: 1,
  }

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={{ marginTop: 60 }}>
      <Button title="useFormDemo" onPress={() => {
        setState({ tabType: 0 })
      }} />
      <Button title="useUserList" onPress={() => {
        setState({ tabType: 1 })
      }} />
      </View>
      {
        state.tabType === 0 ? (
          <FormDemo />
        ) : null
      }
      {
        state.tabType === 1 ? (
          <UserList />
        ) : null
      }
    </View>
  )
}

export default App
