import React from 'react';
import { FormField, Label, TextArea } from 'semantic-ui-react';
import { useField } from 'formik';

export default function MyTextArea({label, ...props}) {

    const [field, meta] = useField(props);

    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <TextArea {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </FormField>
    )
}