import { useState, useCallback } from 'react'

import { FormDataType, FormField, FormSubmitResult, UseFormChangeResult } from '../types'

function useFormChange<T extends Record<string, FormField<any, FormDataType>>> (
    initialState: T,
    configs?: { errMessage: string },
): UseFormChangeResult<T> {
    const [formData, setFormData] = useState<FormDataType>(() => {
        const initialFormData: FormDataType = {}
        Object.keys(initialState).forEach((key) => {
            initialFormData[key] = initialState[key].value
        })
        return initialFormData
    })

    const [formErrors, setFormErrors] = useState<{ [K in keyof T]?: string }>({})

    const { errMessage = 'Field cannot be empty' } = configs ?? {}

    const setFormItem = useCallback((formItem: Partial<FormDataType>) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, ...formItem }
        })
    }, [])

    const handleSubmit = useCallback(() => {
        return new Promise<FormSubmitResult<FormDataType>>((resolve, reject) => {
            const formErrors: { [K in keyof T]?: string } = {}

            Object.entries(initialState).forEach(([key, field]) => {
                const value = formData[key]
                if (field.required && !value) {
                    formErrors[key as keyof T] = field.message || errMessage
                } else if (field.validator) {
                    const validationError = field.validator(value, formData as FormDataType)
                    if (validationError) {
                        formErrors[key as keyof T] = validationError
                    }
                }
            })

            setFormErrors(formErrors)

            if (Object.keys(formErrors).length === 0) {
                resolve(formData)
            } else {
                reject(formErrors)
            }
        })
    }, [formData, initialState, setFormErrors, errMessage])

    const resetForm = useCallback(() => {
        const initialFormData: FormDataType = {}
        Object.keys(initialState).forEach((key) => {
            initialFormData[key] = initialState[key].value
        })
        setFormData(initialFormData)
        setFormErrors({})
    }, [initialState])

    return [formData, setFormItem, formErrors, handleSubmit, resetForm]
}

export default useFormChange
