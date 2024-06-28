import React from 'react'

import './customButton.styles.css';

function CustomButton({
    children, 
    buttonWidth, 
    onClick, 
    bgColor,
    disabled,
    title,
})

{
  return (
    <button className={`btn ${bgColor ? bgColor : ''} ${disabled ? 'disabledStyle' : ''}`} style={{width: `${buttonWidth ? buttonWidth : ''}`}} onClick={onClick} disabled={disabled ? true : false} title={disabled? 'Disable': title}>
        {children}
    </button>
  )
}

export default CustomButton