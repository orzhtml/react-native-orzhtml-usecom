import { useState, useCallback } from 'react';

import { FormField, TransformedFormData, UseFormChangeResult } from '../types';

function useFormChange<T extends Record<string, FormField<any>>>(
  initialState: T,
  configs?: {
    errMessage: string;
  }
): UseFormChangeResult<T> {
  const initialFormData = Object.fromEntries(
    Object.entries(initialState).map(([key, field]) => [key, field.value])
  ) as TransformedFormData<T>;
  
  const [formData, setFormData] = useState<TransformedFormData<T>>(initialFormData);
  
  const [formErrors, setFormErrors] = useState<{ [K in keyof TransformedFormData<T>]?: string }>({});

  const { errMessage = 'Field cannot be empty' } = configs ?? {};

  const setFormItem = useCallback(
    (formItem: Partial<TransformedFormData<T>>) => {
      setFormData((prevFormData) => {
        const updatedForm: TransformedFormData<T> = { ...prevFormData };
        Object.entries(formItem).forEach(([key, value]) => {
          if (key in initialState) {
            updatedForm[key as keyof T] = value as TransformedFormData<T>[keyof T];
          }
        });
        return updatedForm;
      });
    },
    [initialState]
  );  

  const handleSubmit = useCallback(async (): Promise<TransformedFormData<T>> => {
    return new Promise((resolve, reject) => {
      const formErrors: { [key in keyof T]?: string } = {};
  
      // 校验逻辑
      Object.entries(initialState).forEach(([key, field]) => {
        const value = formData[key as keyof T];
        if (field.required && !value) {
          formErrors[key as keyof T] = field.message || errMessage;
        } else if (field.validator) {
          const validationError = field.validator!(value, formData);
          if (validationError) {
            formErrors[key as keyof T] = validationError;
          }
        }
      });
  
      setFormErrors(formErrors);
      // 检查表单是否有错误
      if (Object.keys(formErrors).length === 0) {
        // 表单校验通过，转换数据结构并返回
        const result: TransformedFormData<T> = {} as TransformedFormData<T>;
        Object.entries(initialState).forEach(([key, _]) => {
          result[key as keyof T] = formData[key as keyof T] as TransformedFormData<T>[keyof T];
        });
        resolve(result);
      } else {
        // 表单有错误，拒绝并返回错误信息
        reject(formErrors);
      }
    });
  }, [formData, setFormErrors, errMessage, initialState]);  

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFormErrors({});
  }, [initialFormData]);

  return [formData, setFormItem, formErrors, handleSubmit, resetForm] as UseFormChangeResult<T>;
}

export default useFormChange;