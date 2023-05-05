import { ChangeEvent, useState } from "react";

export const useForm = <T>(inicitalForm: {[key: string]: string} = {}) => {
    
    const [formState, setFormState] = useState(inicitalForm);
      const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
         setFormState({
          ...formState, [name]: value
         })
      }

      const onResetForm = (() => {
        setFormState(inicitalForm);
      });
    
    return {
        ...(formState as T),
        formState,
        onInputChange,
        onResetForm
    };
}
