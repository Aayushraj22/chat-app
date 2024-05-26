import React, { useState } from 'react'

import './input.styles.css';


export default function Input({
    id,
    type,
    disabled,
    name,
    placeholder,
    required,
    updateUserData,
}) {

    const [data, setData] = useState('')
    function handleUpdateData(e){
        const data = e.target.value;
        setData(data);
        updateUserData(name,data); // this method will update the [name] property of an object which is closer of this function in parent component.
    }

  return (
    <div className='inputContainer'>
        <label htmlFor={id}>
            {name.slice(0,1).toUpperCase() + name.slice(1)}
        </label>
        <input 
            id={id} 
            name={name} 
            type={type} 
            value={data} 
            placeholder={placeholder || ''} 
            disabled = {disabled}
            required = {required}
            onChange={handleUpdateData} 
        />
    </div>
  )
}
