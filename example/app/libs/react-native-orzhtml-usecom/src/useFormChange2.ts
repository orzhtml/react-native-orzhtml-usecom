import { useState, useCallback, Dispatch, SetStateAction } from 'react';

interface Field {
  value: any;
  required?: boolean;
  message?: string;
  validator?: (value: any, formData: FormData) => string | undefined;
}

interface FormData {
  [key: string]: any;
}

interface Configs {
  errMessage?: string;
}

type FormErrors = { [key: string]: string };

function useFormChange<T extends Record<string, Field>>(
  initialState: T,
  configs?: Configs
): [
  FormData,
  Dispatch<SetStateAction<FormData>>,
  FormErrors,
  () => Promise<FormData>,
  () => void
] {
  const initialFormData: FormData = Object.fromEntries(
    Object.entries(initialState).map(([key, field]) => [key, field.value])
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { errMessage = 'Field cannot be empty' } = configs ?? {};

  const setFormItem = useCallback(
    (formItem: Partial<FormData>) => {
      setFormData((prevFormData) => {
        const updatedForm: FormData = { ...prevFormData };
        Object.entries(formItem).forEach(([key, value]) => {
          if (key in initialState) {
            updatedForm[key] = value;
          }
        });
        return updatedForm;
      });
    },
    [initialState]
  );

  const handleSubmit = useCallback(async (): Promise<FormData> => {
    return new Promise<FormData>((resolve, reject) => {
      const formErrors: FormErrors = {};
      Object.entries(initialState).forEach(([key, field]) => {
        const value = formData[key];
        if (field.required && !value) {
          formErrors[key] = field.message || errMessage;
        } else if (field.validator) {
          const validationError = field.validator!(value, formData);
          if (validationError) {
            formErrors[key] = validationError;
          }
        }
      });

      setFormErrors(formErrors);
      // 检查表单是否有错误
      if (Object.keys(formErrors).length === 0) {
        // 表单校验通过，转换数据结构并返回
        const result: FormData = {};
        Object.entries(initialState).forEach(([key, _]) => {
          result[key] = formData[key];
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

  return [formData, setFormItem, formErrors, handleSubmit, resetForm];
}

export default useFormChange;
