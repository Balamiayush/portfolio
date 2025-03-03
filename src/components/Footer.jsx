import React from 'react'

const Footer = () => {
  return (
    <div
    style={{
        fontFamily:"var(--font-family1)",
    }}
     className='w-full h-[10vh] lg:p-5 lg:absolute bottom-0   flex items-center justify-between'>
     <div className='flex gap-5'>
    <a href='mailto:aryanbalami54@gmail.com'>contact:aryanbalami54@gmail.com</a>
    <a href='tel:9808922833'>phone:9808922833</a>
     </div>
     <div>
        <h1>copyright@2025</h1>
     </div>
    </div>
  )
}

export default Footer