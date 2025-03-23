import React from 'react'

const Footer = () => {
  return (
    <div
    style={{
        fontFamily:"var(--font-family1)",
    }}
     className='w-full  lg:p-5 absolute text-[0.8rem] lg:text-[1rem] lg:bottom-[-10vh]  bottom-[-10vh] flex-wrap  gap-10    flex items-center justify-center '>
     <div className='flex gap-5'>
    <a href='mailto:aryanbalami54@gmail.com'>contact:aryanbalami54@gmail.com</a>
    <a href='tel:9808922833'>phone:9808922833</a>
        <h1>copyright@2025</h1>
     </div>
    </div>
  )
}

export default Footer