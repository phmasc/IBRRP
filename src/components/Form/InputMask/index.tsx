import React, { useRef, useEffect } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

import { useField } from '@unform/core';

import './styles.css'

interface Props extends InputProps {
    name: string;
    label?: string;
}

const InputMask: React.FC<Props> = ({ name, label, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                ref.setInputValue(value);
            },
            clearValue(ref: any) {
                ref.setInputValue('');
            },
        });
    }, [fieldName, registerField]);

    return (
        <div id="input-container" className={`${error ? 'error' : ''}`} >
            {label && <label htmlFor={fieldName}>{label}</label>}
            <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
            {error && <span className='input-error' >{error}</span>}
        </div>
    );
};

export default InputMask;