import React, { useState, useTransition } from 'react'
const About = () => {
  const [isPending, startTransition] = useTransition()
  const [tab,setTab] = useState('about')
  return (
    <div className='w-full h-screen bg-black'>About</div>
  )
}

export default About