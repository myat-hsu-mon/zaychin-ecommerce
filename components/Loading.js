import React from 'react'

export default function Loading() {
  return (
    <div id='seperated-loading'>
      <div className='loading'>
        <div className='logo'>
          <div className='logo-bg' />
          <img src={'/imgs/zaychin-logo.svg'} />
        </div>
        <span>အလုပ်လုပ်နေသည်...</span>
      </div>
    </div>
  )
}
