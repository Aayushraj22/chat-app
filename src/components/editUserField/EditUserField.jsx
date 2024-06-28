import React, { useRef, useState } from 'react'


import './editUserField.styles.css';
import CustomButton from '../customButton/CustomButton';
import { findUser } from '../../Pages/utility';
import { updateUserDocField } from '../../firebase/user.firestore';
import Loader from '../loader/Loader'

function EditUserField({fieldname,value}) {

    const [fieldData, setFieldData] = useState({
        previous: value,
        update: value,
        isDisable: true,
    })
    const [isLoading, setIsLoading] = useState(false);
    const [validateMsg, setValidateMsg] = useState('')

    let timerID = useRef(null)
    const handleToChangeInput = (e) => {
        const value = e.target.value;

        // set a new timer and delete the previous timer
        if(timerID.current){
            clearTimeout(timerID.current);
        }

        timerID.current = setTimeout(() => {
            // perform a search to db to find whether filled value is availabe or not 
            if(value === ''){
                setValidateMsg('')
                return;
            }

            findUser(value).then((responseData) => {
                if(responseData.id === undefined){  // user not exists
                    setValidateMsg(`${value} can be used`)
                }else{
                    setValidateMsg(`${value} already used by others`)
                }
            })
        }, 1000);

        setFieldData({
            ...fieldData,
            update: value,
        })
    }
    
    const handleToActiveInput = (e) => {
        const parentNode = e.target.parentNode;
        const inputNode = parentNode.firstChild;
        inputNode.disabled = false;
        inputNode.focus();
        setFieldData({
            ...fieldData,
            update:'', 
            isDisable: false,
        })
    }

    const handleToSaveFiled = async() => {
        // update field value in db
        // update state and disable input

        try {
            setIsLoading(true);
            await updateUserDocField(fieldname,localStorage.getItem('userID'),fieldData.update);

            setFieldData({
                ...fieldData,
                previous: fieldData.update,
                isDisable: true,
            })

            setValidateMsg('')
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setValidateMsg('')
            alert('something bad occurs')
        }
        
    }

    return (
        <div className="detailsContainer">
            {isLoading && <Loader />}
            <div className="firstChild">
                <p>{fieldname.slice(0,1).toUpperCase() + fieldname.slice(1)}</p>
                <p>{validateMsg && validateMsg}</p>
            </div>
            <div className="secondChild">
                <input type="text" disabled={fieldData.isDisable ? true : false}  onChange={handleToChangeInput} value={fieldData.isDisable ? fieldData.previous : fieldData.update}/>
                <CustomButton buttonWidth='80px' title='change username' onClick={handleToActiveInput} >Edit</CustomButton>
                <CustomButton buttonWidth='80px' disabled={validateMsg?.includes('can be used') ? false : true} onClick={handleToSaveFiled}>Save</CustomButton>
            </div>
        </div>
    )
}

export default EditUserField