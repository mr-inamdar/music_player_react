import React from 'react'

export default function RangeSlider({max, value, onChange}) {
  return (
    <div className='slider_wrapper'>
      <input 
      type="range" 
      className='slider' 
      min='0' max={max} 
      value={value} 
      onChange={onChange} 
      style={{background: `linear-gradient(to right, #fafafa ${(100 * value)/max}%, #0220374d ${(100 * value)/max}%)`}} />
    </div>
  )
}
