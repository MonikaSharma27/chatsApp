import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

function Left() {
  return (
    <div className='w-full bg-black text-gray-300'>
    <Search/>
    <div  style={{minHeight:"calc(91vh - 10vh) "}}>
       <Users/>
      </div>
    <Logout/>
    </div>
  )
}

export default Left
