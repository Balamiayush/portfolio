import React, { useState } from 'react'
import Modal from './Modal'
import Project from './Project'
const Index = () => {
  const projects = [
  {
    title: "C2 Montreal",
    src: "https://images.unsplash.com/photo-1746469435657-748958dbfc68?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#000000"
  },
  {
    title: "Office Studio",
    src: "https://images.unsplash.com/photo-1746513420182-56a5a1f50034?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
    color: "#8C8C8C"
  },
  {
    title: "Locomotive",
    src: "https://plus.unsplash.com/premium_photo-1672993059315-72004f758473?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
    color: "#EFE8D3"
  },
  {
    title: "Silencio",
    src: "https://images.unsplash.com/photo-1746728843342-25f976c53b2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
    color: "#706D63"
  }
]
  const [modal, setModal] = useState({active: false, index: 0})

  return (
    <div className='main'>
      <div className="body">
        {

          projects.map( (project, index) => {
            return <Project index={index} title={project.title} setModal={setModal} key={index}/>
          })
        }
      </div>
      <Modal modal={modal} setModal={setModal} projects={projects}/>
    </div>
  )
}

export default Index