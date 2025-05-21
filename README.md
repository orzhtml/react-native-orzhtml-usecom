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

```javascript
// Example

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

```javascript
// Example

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

```javascript
// Example

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

### useDebounce | useMockRequest
防抖 | 模拟请求

```javascript
// Example
// ...
import {useDebounce, useMockRequest} from 'react-native-orzhtml-usecom';

const DebounceDemo = () => {
  const {
    execute: search,
    cancel: cancelSearch,
    isPending,
  } = useDebounce(handleSearch, {
    delay: 300,
    leading: true,
  });

  const {execute: submit} = useDebounce(handleSubmit, 500);

  const {mockRequest} = useMockRequest<{keyword: string}>();
  const [keyword, setKeyword] = useState('');

  async function handleSearch(text: string) {
    console.log('search', text);
    const response = await mockRequest({
      mockData: {keyword: text},
    });
    console.log('handleSearch Success:', response);
  }

  async function handleSubmit() {
    console.log('handleSubmit');
    const response = await mockRequest({
      mockData: {keyword: keyword},
    });
    console.log('handleSearch Success:', response);
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setKeyword(text);
          search(text);
        }}
        onBlur={cancelSearch}
      />

      <Button title="提交表单" onPress={submit} />

      {isPending && <ActivityIndicator />}
    </View>
  );
};
```

### useMockRequest
模拟请求，对于复杂嵌套类型：

```javascript
type PaginationData<T> = {
  page: number;
  pageSize: number;
  total: number;
  results: T[];
};

// 使用
const { mockRequest } = useMockRequest<PaginationData<User>>();

mockRequest({
  mockData: {
    page: 1,
    pageSize: 10,
    total: 100,
    results: [/* User类型数组 */]
  } // 自动校验嵌套类型
});
```

### useThrottle
节流

```javascript
// Example
// ...
import {useThrottle} from 'react-native-orzhtml-usecom';

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
```

### useFormChange
表单/表头搜素hooks

```javascript
// Example
// ...
import { useFormChange } from 'react-native-orzhtml-usecom'
const [formData, setFormItem, reset] = useFormChange()function FormDemo() {
  const [formData, setFormItem, formErrors, submitForm, resetForm] =
    useFormChange(
      {
        name: {
          value: '',
          required: true,
        },
        email: {
          value: '',
          message: 'Email is required',
          validator: (value, data) => {
            if (data.name) {
              if (!value) {
                return 'Email is required';
              }
              if (typeof value !== 'string' || !value.includes('@')) {
                return 'Invalid email format';
              }
            }
            return undefined;
          },
        },
      },
      {
        errMessage: 'is required',
      },
    );

  const handleFormSubmit = () => {
    submitForm()
      .then(formData => {
        // 处理表单提交
        console.log('formData:', formData);
      })
      .catch(error => {
        // 处理表单错误
        console.log('formData error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={value => setFormItem({name: value})}
      />
      {formErrors.name && <Text style={styles.error}>{formErrors.name}</Text>}

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={value => setFormItem({email: value})}
      />
      {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}
      <Button title="Submit" onPress={handleFormSubmit} />
      <Button title="Reset" onPress={resetForm} />
    </View>
  );
}
```

### useInterval
useInterval 定时器

```javascript
// Example
// ...

import { useInterval } from 'react-native-orzhtml-usecom'
const [interval, intervalClear] = useInterval()

// ...

interval(() => {
  console.log(1)
}, 1000, true)
```

### useTimeout
useTimeout 定时器

```javascript
// Example
// ...

import { useTimeout } from 'react-native-orzhtml-usecom'
const [timeout, timeoutClear] = useTimeout()

// ...

timeout(() => {
  console.log(1)
}, 1000)
```

### useUpdate
更新

```javascript
// Example
// ...
// getList 接口
const update = useUpdate()

 return <View>
    <Button title="更新" onPress={update}>
  </View>
```