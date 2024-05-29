import React, { useEffect, useState } from 'react'

import './input.styles.css';


export default function Input({
    id,
    type,
    disabled,
    name,
    placeholder,
    required,
    updateUserData,
    updateSearchedValue,
    updateMessage,
    deleted
}) {

    const [data, setData] = useState('')
    const [deleteText, setDeleteText] = useState(deleted)
    function handleUpdateData(e){
        const data = e.target.value;
        setData(data);

        updateUserData && updateUserData(name,data); // this method will update the [name] property of an object which is closer of this function in parent component[signin,signup].

        updateSearchedValue && updateSearchedValue(data);  // this method update the value of a variable that is closure of it present in parent component where this method is defined, and help to get the searched value.

        updateMessage && updateMessage(data);

    }

    useEffect(() => { 
        setDeleteText(deleted);
    }, [deleted]) 
    

    if(deleteText){
        setData('')
        setDeleteText(false);
    }

  return (
    <div className='inputContainer'>
        <label htmlFor={id}>
            {name && name.slice(0,1).toUpperCase() + name.slice(1)}
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
