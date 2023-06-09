import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

import { useFormChange } from "../libs/react-native-orzhtml-usecom";
// import { useFormChange } from 'react-native-orzhtml-usecom'

function FormDemo() {
    const [formData, setFormItem, formErrors, submitForm, resetForm] = useFormChange({
        name: {
            value: '',
            required: true,
            // message: 'Name is required',
        },
        email: {
            value: '',
            required: true,
            message: 'Email is required',
            validator: (value: string) => {
                if (!value.includes('@')) {
                    return 'Invalid email format';
                }
                return undefined;
            },
        },
    }, {
        errMessage: 'is required',
    });

    const handleFormSubmit = () => {
        submitForm().then(formData => {
             // 处理表单提交
             console.log('formData:', formData);
        }).catch(error => {
            // 处理表单错误
            console.log('formData error:', error);
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => setFormItem({ name: value })}
            />
            {formErrors.name && <Text style={styles.error}>{formErrors.name}</Text>}

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => setFormItem({ email: value })}
            />
            {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}

            <Button title="Submit" onPress={handleFormSubmit} />
            <Button title="Reset" onPress={resetForm} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        marginBottom: 8,
    },
});

export default FormDemo
