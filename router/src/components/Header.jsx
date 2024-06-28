import React from 'react'
import {Link} from 'react-router-dom'
export const Header = () => {
  return (
    <div className= "navbar navbar-expand-lg bg-body-tertiary">
      <div className="d-flex col-3 justify-content-around">
        <Link className='text-decoration-none' style={{color: 'ThreeDShadow'}} to={'/'} >Home</Link>
        <Link className = "text-decoration-none" style={{color: 'ThreeDShadow'}} to={'/about'} >About</Link>
        <Link className = "text-decoration-none" style={{color: 'ThreeDShadow'}} to={'/contact'} >Contact</Link>
      </div>
    </div>
  )
}