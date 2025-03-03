import React from 'react'

const Footer = () => {
  return (
    <div
    style={{
        fontFamily:"var(--font-family1)",
    }}
     className='w-full h-[10vh] lg:p-5 lg:absolute bottom-0   flex items-center justify-between'>
     <div className='flex gap-5'>
    <h1>contact:aryanbalami54@gmail.com</h1>
    <h1>phone:9808922833</h1>
     </div>
     <div>
        <h1>copyright@2025</h1>
     </div>
    </div>
  )
}

export default Footer