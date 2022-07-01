# react-native-orzhtml-usecom

react react-native typescript：hooks 的状态 use 扩展

> 如果你发现该项目对你有用，请加个星吧。

## Install

`yarn add react-native-orzhtml-usecom`

## hooks

- [useStateCB](#useStateCB)

让你可以安全地使用 react 的 state，它的值就是你想要的值，而不是陈旧的值。并且也拥有了 callback 的能力。

- [useSingleState（推荐使用）](#useSingleState)

使用类似于 `class` 形式的 `this.state` 和 `this.setState` 的方式来使用 `state`。同样可以安全地使用 state，并且拥有 callback 能力

- [useSingleInstanceVar（推荐使用）](#useSingleInstanceVar)

（推荐使用）将所有实例变量声明在一起，并以更接近实例变量的方式使用


## 使用

### useStateCB

让你可以安全地使用 react 的 state，它的值就是你想要的值，而不是陈旧的值。并且也拥有了 callback 的能力。

```
# Example

import React from 'react'
import { View, Text, Button } from 'react-native'

import { useStateCB } from 'react-native-orzhtml-usecom'

export const UseStateCBDemoComp = () => {
  const [getCount, setCount] = useStateCB(0)

  const doSomeActions = () => {
    console.log('Current count:', getCount())
  }

  return (
    <View>
      <Text>{getCount()}</Text>
      <Button 
        onPress={() => {
      	  setCount(getCount() + 1, doSomeActions)
        }}
        title="Increase"
      />
    </View>
  );
};
```

### useSingleState

（推荐使用）使用类似于 `class` 形式的 `this.state` 和 `this.setState` 的方式来使用 `state`。同样可以安全地使用 state，并且拥有 callback 能力

```
# Example

import React from 'react'
import { View, Text, Button } from 'react-native'

import { useSingleState } from 'react-native-orzhtml-usecom'

export const UseSingleStateDemoComp = () => {
  const [state, setState] = useSingleState({
    count: 0,
    time: +new Date()
  })

  const doSomeActions = () => {
    console.log("Current count:", state.count)
  }

  return (
    <View>
      <Text>useSingleState</Text>

      <Text>{state.count} {state.time}</Text>

      <Button
        onPress={() => {
        	  setState(
            {
              count: state.count + 1
            },
            doSomeActions
          )
        }}
        title="Increase"
      />
      <Button
        onPress={() => {
          setState({
            time: +new Date()
          })
        }}
        title="Change Time"
      />
    </div>
  );
};
```

### useSingleInstanceVar

（推荐使用）将所有实例变量声明在一起，并以更接近实例变量的方式使用

```
# Example

import React from 'react'
import { View, Text, Button } from 'react-native'

import { useSingleInstanceVar, useSingleState } from 'react-native-orzhtml-usecom'

export const UseSingleInstanceVarDemoComp = () => {
  const instanceVal = useSingleInstanceVar({
    interval: null
  })

  const [state, setState] = useSingleState({ count: 0 })

  const start = () => {
    stop()
    instanceVal.interval = setInterval(
      () => setState({ count: state.count + 1 }),
      1000
    )
  }

  const stop = () => {
    const interval = instanceVal.interval
    interval && clearInterval(interval)
  }

  return (
    <View>
      <Text>{state.count}</Text>
      <Button onPress={start} title="Start" />
      <Button onPress={stop} title="Stop" />
    </View>
  )
}
```


## 贡献

参考学习的 https://github.com/daniel-dx/nice-hooks


