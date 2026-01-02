import { PlusIcon } from 'lucide-react'
import React from 'react'
import {Link} from "react-router"
function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className='font-bold text-3xl text-primary font-mono tracking-tight'>ThinkBoard</h1>
          <div className="flex items-centergap-4">
            <Link to={"/create"} className='btn btn-primary'>
            <PlusIcon className='h-5 w-5'/>
            <span>New Note</span>
            </Link>
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
