import React, { useState } from 'react'
import { BsCaretDownSquareFill } from "react-icons/bs";

import './navigateToBottom.styles.css'

function NavigateToBottom({scrollToBottom}) {

    
  return (
    <div onClick={scrollToBottom} className='navigateBottom' >
        {<BsCaretDownSquareFill /> ? <BsCaretDownSquareFill size={30} /> : 'Bottom'}
    </div>
  )
}

export default NavigateToBottom

