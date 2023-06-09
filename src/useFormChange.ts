import { useState, useCallback } from 'react';

import { FormField, FormSubmitResult, UseFormChangeResult } from '../types';

function useFormChange<T extends Record<string, FormField<any>>>(initialState: T, configs?: {
  errMessage: string,
}): UseFormChangeResult<T> {
  const [formData, setFormData] = useState<T>(() => {
    // 使用 initialState 作为初始值
    return initialState;
  });

  const [formErrors, setFormErrors] = useState<{ [K in keyof T]?: string }>({});

  const { errMessage = 'Field cannot be empty' } = configs ?? {}

  const setFormItem = useCallback(
    (formItem: Partial<{ [K in keyof T]: T[K] extends FormField<infer V> ? V : never }>) => {
      setFormData((prevFormData) => {
        const updatedForm = { ...prevFormData };
        Object.entries(formItem).forEach(([key, value]) => {
          if (key in updatedForm) {
            (updatedForm[key as keyof T] as FormField<any>).value = value;
          }
        });
        return updatedForm;
      });
    },
    []
  );  

  const handleSubmit = useCallback((): FormSubmitResult<T> => {
    const formErrors: { [key in keyof T]?: string } = {};

    // 校验逻辑
    Object.entries(formData).forEach(([key, field]) => {
      if ((field as FormField<any>).required && !(field as FormField<any>).value) {
        formErrors[key as keyof T] = (field as FormField<any>).message || errMessage;
      } else if ((field as FormField<any>).validator) {
        const validationError = (field as FormField<any>).validator!((field as FormField<any>).value);
        if (validationError) {
          formErrors[key as keyof T] = validationError;
        }
      }
    });

    setFormErrors(formErrors);
    // 检查表单是否有错误
    if (Object.keys(formErrors).length === 0) {
      // 表单校验通过，返回表单数据
      return { formData };
    } else {
      // 表单有错误，更新错误状态
      return { formData, errors: formErrors };
    }
  }, [formData, setFormErrors]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setFormErrors({});
  }, [initialState]);

  return [formData, setFormItem, formErrors, handleSubmit, resetForm] as UseFormChangeResult<T>;
}

export default useFormChange;