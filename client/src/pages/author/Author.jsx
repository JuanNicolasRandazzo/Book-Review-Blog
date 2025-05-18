import React from 'react'
import { AuthInfo } from '../../components/authInfo/AuthInfo'
import { Sidebar } from '../../components/sidebar/Sidebar'
import "./author.css"

export const Author = () => {
  return (
    <div className='author'>
      <AuthInfo/>
      <Sidebar/>
    </div>
  )
}
