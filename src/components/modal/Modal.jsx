import React from 'react'

import './modal.styles.css';
import CustomButton from '../customButton/CustomButton';

function Modal({onClose, children}) {
  return (
    <div className='modalContainer'>
        <div className="modalContentArea">
            <CustomButton onClick={onClose} buttonWidth={'120px'} bgColor='redBG'>Close</CustomButton>

            <div className="childStyle">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal