import React, {useState} from 'react';
import {
  View,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useDebounce, useMockRequest} from '../libs/react-native-orzhtml-usecom';

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

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#666',
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    color: '#fff',
  },
});

export default DebounceDemo;
