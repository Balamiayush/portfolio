
import React from 'react'

export default function index({index, title, setModal}) {

    return (
        <div onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className="project">
            <h2>{title}</h2>
            <p>Design & Development</p>
            
        </div>
    )
}